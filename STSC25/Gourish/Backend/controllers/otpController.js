import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { getUserByEmail, resetUserPassword } from '../models/userModel.js'
import config from '../config.js';

// Load environment variables
dotenv.config();

// Gmail credentials
const gmail = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASS;

// Create a transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  requireTLS: true,
  auth: {
    user: gmail,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// OTP and email to verify (store these globally)
let otpStorage = { otp: '', emailToVerify: '' };

// function for oTp
export const requestOtp = async (req, res) => {

  const { email } = req.body;

  const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  // writing for thr random code to generate 
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Storing    OTP and email in otpStorage
  otpStorage = { otp, emailToVerify: email };

  // Send OTP via email
  const mailOptions = {
    from: gmail,  
    to: email,    //reveiver
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {

    console.error('Error sending OTP:', error);  
    return res.status(500).json({
      success: false,
      message: `Error sending OTP: ${error.responseCode} - ${error.message}`,
    });
  }
};

// Verify OTP
export const verifyOtp = (req, res) => {

  const { email, otp: userOtp } = req.body;

  // Validate if OTP is a valid number
  if (!/^\d{6}$/.test(userOtp)) {

    return res.status(400).json({ success: false, message: 'OTP must be a 6-digit number' });
  }

  // Check if the OTP matches the stored OTP and email
  if (email === otpStorage.emailToVerify && parseInt(userOtp) === otpStorage.otp) {

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } else {

    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {

    console.log('Received Data:', req.body);

    if (!newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed Password:', hashedPassword); // Debugging: Log hashed password
    const result = await resetUserPassword(email, hashedPassword);
    console.log('result:', result);

    // Respond with success
    return res.status(200).json({ success: true, message: 'Password reset successfully' });

  } catch (error) {

    console.error('Error resetting password:', error);
    return res.status(500).json({ success: false, message: 'Error resetting password' });
  }
};