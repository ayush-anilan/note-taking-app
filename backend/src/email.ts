import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ayushanilan369@gmail.com',
      pass: 'pnzs jswo rkvh hxpj'
    }
  });

// Function to send verification email

export async function sendVerificationEmail(email: string, verificationLink: string) {
    try {
      await transporter.sendMail({
        from: 'your_email@example.com',
        to: email,
        subject: 'Verify your email address',
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email address.</p>`
      });
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }