import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../.env') });
import { sendVerificationEmail } from '../email';



// User Register
export const register_post = async (req: Request, res: Response, next: NextFunction) => {
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
      const verificationLink = `https://note-taking-app-1.onrender.com/verify/${verificationToken}`;
      await sendVerificationEmail(email, verificationLink);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }


  export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    try {
      console.log("Verification token:", token);
      
      // Find user by verification token
      const user = await User.query().findOne({ verificationToken: token });
      if (!user) {
        console.log("Invalid verification token");
        return res.status(404).json({ error: 'Invalid verification token' });
      }
  
      // Update user as verified
      await User.query().findById(user.id).patch({ verified: true, verificationToken: null });
      console.log("User verified successfully");
      res.status(200).json({ message: 'Email verified successfully', user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  


export const login_post = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await User.query().findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Check if password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Check if user is verified
      if (!user.verified) {
        return res.status(401).json({ error: 'Please verify your email address' });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, `${process.env.SECRET_KEY}` as string, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token, user: {id: user.id} });
    } catch (error) {
      console.error(error);
      next(error)
    }
  };