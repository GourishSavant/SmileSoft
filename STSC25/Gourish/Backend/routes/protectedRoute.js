
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { requestOtp } from '../controllers/otpController.js';
import { verifyOtp } from '../controllers/otpController.js';
import { resetPassword } from '../controllers/otpController.js';
const router = express.Router();

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     bearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  * /auth/v1/admin-dashboard:
//  *   get:
//  *     summary: Access Admin Dashboard
//  *     description: This endpoint allows the user with the "Admin" role to access the Admin Dashboard.
//  *     security:
//  *       - bearerAuth: []  # Specifies that Bearer token is required
//  *     responses:
//  *       200:
//  *         description: Welcome message for Admin
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Welcome to Admin Dashboard"
//  *       401:
//  *         description: Unauthorized - Missing or invalid authentication token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Not authorized, no token"
//  *       403:
//  *         description: Forbidden - User does not have the required role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Forbidden. You do not have access to this resource."
//  */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /auth/v1/admin-dashboard:
 *   get:
 *     tags:
 *       - dashboard API
 *     summary: Access Admin Dashboard
 *     description: This endpoint allows the user with the "Admin" role to access the Admin Dashboard.
 *     security:
 *       - bearerAuth: []  # Specifies that Bearer token is required
 *     responses:
 *       200:
 *         description: Welcome message for Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Admin Dashboard"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized, no token"
 *       403:
 *         description: Forbidden - User does not have the required role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. You do not have access to this resource."
 */

router.get('/admin-dashboard', authenticateToken, authorizeRole('Admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

// /**
//  * @swagger
//  * /auth/v1/admin-super-dashboard:
//  *   get:
//  *     summary: Access Super Admin Dashboard
//  *     description: This endpoint allows the user with the "superAdmin" role to access the Super Admin Dashboard.
//  *     security:
//  *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
//  *     responses:
//  *       200:
//  *         description: Welcome message for Super Admin
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Welcome to Super Admin Dashboard"
//  *       401:
//  *         description: Unauthorized - Missing or invalid authentication token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Not authorized, no token"
//  *       403:
//  *         description: Forbidden - User does not have the required role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Forbidden. You do not have access to this resource."
//  */
/**
 * @swagger
 * /auth/v1/super-admin-dashboard:
 *   get:
 *     tags:
 *       - dashboard API
 *     summary: Access Super Admin Dashboard
 *     description: This endpoint allows the user with the "superAdmin" role to access the Super Admin Dashboard.
 *     security:
 *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
 *     responses:
 *       200:
 *         description: Welcome message for Super Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Super Admin Dashboard"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized, no token"
 *       403:
 *         description: Forbidden - User does not have the required role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. You do not have access to this resource."
 */

router.get('/super-admin-dashboard', authenticateToken, authorizeRole('superAdmin'), (req, res) => {
  res.json({ message: 'Welcome to Super Admin Dashboard' });
});

// /**
//  * @swagger
//  * /auth/v1/student-dashboard:
//  *   get:
//  *     summary: Access Student Dashboard
//  *     description: This endpoint allows the user with the "student" role to access the Student Dashboard.
//  *     security:
//  *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
//  *     responses:
//  *       200:
//  *         description: Welcome message for Student
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Welcome to Student Dashboard"
//  *       401:
//  *         description: Unauthorized - Missing or invalid authentication token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Not authorized, no token"
//  *       403:
//  *         description: Forbidden - User does not have the required role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Forbidden. You do not have access to this resource."
//  */
/**
 * @swagger
 * /auth/v1/student-dashboard:
 *   get:
 *     tags:
 *       - dashboard API
 *     summary: Access Student Dashboard
 *     description: This endpoint allows the user with the "student" role to access the Student Dashboard.
 *     security:
 *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
 *     responses:
 *       200:
 *         description: Welcome message for Student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Student Dashboard"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized, no token"
 *       403:
 *         description: Forbidden - User does not have the required role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. You do not have access to this resource."
 */

router.get('/student-dashboard', authenticateToken, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Welcome to Student Dashboard' });
});

// /**
//  * @swagger
//  * /auth/v1/teacher-dashboard:
//  *   get:
//  *     summary: Access Teacher Dashboard
//  *     description: This endpoint allows the user with the "Teacher" role to access the Teacher Dashboard.
//  *     security:
//  *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
//  *     responses:
//  *       200:
//  *         description: Welcome message for Teacher
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Welcome to Teacher Dashboard"
//  *       401:
//  *         description: Unauthorized - Missing or invalid authentication token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Not authorized, no token"
//  *       403:
//  *         description: Forbidden - User does not have the required role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Forbidden. You do not have access to this resource."
//  */
/**
 * @swagger
 * /auth/v1/teacher-dashboard:
 *   get:
 *     tags:
 *       - dashboard API
 *     summary: Access Teacher Dashboard
 *     description: This endpoint allows the user with the "Teacher" role to access the Teacher Dashboard.
 *     security:
 *       - bearerAuth: []  # This specifies that the Bearer token is required for this endpoint
 *     responses:
 *       200:
 *         description: Welcome message for Teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Teacher Dashboard"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized, no token"
 *       403:
 *         description: Forbidden - User does not have the required role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. You do not have access to this resource."
 */

router.get('/teacher-dashboard', authenticateToken, authorizeRole('teacher'), (req, res) => {
  res.json({ message: 'Welcome to Teacher Dashboard' });
});
/**
 * @swagger
 * /auth/v1/request-otp:
 *   post:
 *     tags:
 *       - resetpassword API
 *     summary: Request an OTP for password reset
 *     description: This endpoint allows the user to request an OTP (One-Time Password) to reset their password. The OTP will be sent to the user's registered email or phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address for OTP request (optional)
 *                 example: "user@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or phone number"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, missing or invalid token"
 *       403:
 *         description: Forbidden - User does not have the required role or permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. You do not have permission to request an OTP."
 */

router.post('/request-otp', requestOtp); 
/**
 * @swagger
 * /auth/v1/verify-otp:
 *   post:
 *     tags:
 *       - resetpassword API
 *     summary: Verify OTP for password reset
 *     description: This endpoint allows the user to verify the OTP (One-Time Password) sent for password reset. The OTP must match the one sent to the user's registered email or phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: One-Time Password (OTP) entered by the user for verification
 *                 example: "123456"
 *               email:
 *                 type: string
 *                 description: User's email address for OTP verification
 *                 example: "user@example.com"
 *             required:
 *               - otp
 *               - email
 *               - phone
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully"
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP or missing data"
 *       401:
 *         description: Unauthorized - Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, invalid OTP"
 *       403:
 *         description: Forbidden - User does not have permission or the OTP is expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. OTP is expired or invalid."
 */

router.post('/verify-otp', verifyOtp); 
/**
 * @swagger
 * /auth/v1/reset-password:
 *   post:
 *     tags:
 *       - resetpassword API
 *     summary: Reset the user's password
 *     description: This endpoint allows the user to reset their password after successfully verifying the OTP. The new password will be set for the user's account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "abc@gmail.com"
 *               newPassword:
 *                 type: string
 *                 description: The new password to set for the user's account
 *                 example: "newpassword123"

 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Passwords do not match or invalid OTP"
 *       401:
 *         description: Unauthorized - Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, invalid OTP"
 *       403:
 *         description: Forbidden - User does not have permission or the OTP is expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden. OTP expired or invalid."
 */

router.post('/reset-password', resetPassword);

export default router;


