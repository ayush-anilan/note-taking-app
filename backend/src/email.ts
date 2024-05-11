import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../.env') });
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    }
  });

// Function to send verification email

export async function sendVerificationEmail(email: string, verificationLink: string) {
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: 'Verify your email address',
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email address.</p>`
      });
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }