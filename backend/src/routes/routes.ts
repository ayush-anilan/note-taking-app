import express, {Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { sendVerificationEmail } from '../email';
import crypto from 'crypto';

const router: Router = express.Router();

// Test Route
router.get('/test', (req, res) => {
  res.send('API is working');
});

// User registration
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.query().insert({ email, password: hashedPassword, verificationToken });
    // Send verification email
    const verificationLink = `http://localhost:5000/api/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Email verification
router.get('/verify/:token', async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    // Find user by verification token
    const user = await User.query().findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ error: 'Invalid verification token' });
    }
    // Update user as verified
    await User.query().findById(user.id).patch({ verified: true, verificationToken: null });
    res.status(200).json({ message: 'Email verified successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;