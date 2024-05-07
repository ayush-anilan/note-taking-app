import express, {Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router: Router = express.Router();

// Test Route
router.get('/test', (req, res) => {
  res.send('API is working');
});

// User registration
router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.query().insert({ email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;