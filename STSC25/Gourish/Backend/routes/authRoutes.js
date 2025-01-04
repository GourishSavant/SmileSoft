import express from 'express';
import { registerUser, loginUser, getUser, logoutUser } from '../controllers/authController.js';
import { refreshToken } from '../controllers/authController.js';
const router = express.Router(); 

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - auth API
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their details such as full name, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password chosen by the user
 *                 example: "Password123!"
 *               role:
 *                 type: string
 *                 description: The role assigned to the user (e.g., admin, user, etc.)
 *                 example: "user"
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password"
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error, please try again later"
 */

router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - auth API
 *     summary: Login an existing user
 *     description: This endpoint allows a user to login by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john_doe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns user details and a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john_doe@gmail.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - Incorrect username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized - Incorrect email or password"
 */

// router.post('/login', loginUser);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags:
 *       - auth API
 *     summary: Get details of the authenticated user
 *     description: This endpoint retrieves the details of the currently authenticated user.
 *     responses:
 *       200:
 *         description: Returns user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "john_doe@gmail.com"
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized - Missing or invalid authentication token"
 */

router.get('/user', getUser);
// /**
//  * @swagger
//  * /auth/refresh-token:
//  *   post:
//  *     summary: Refresh access token using a valid refresh token
//  *     description: This endpoint allows the user to refresh an expired access token by providing a valid refresh token.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *                 description: The refresh token provided by the client, used to obtain a new access token.
//  *                 example: "your-refresh-token-here"
//  *     responses:
//  *       200:
//  *         description: Access token successfully refreshed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Access token refreshed successfully"
//  *                 accessToken:
//  *                   type: string
//  *                   example: "new-access-token-here"
//  *       400:
//  *         description: Bad Request - Missing or invalid refresh token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Missing or invalid refresh token"
//  *       401:
//  *         description: Unauthorized - Invalid or expired refresh token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Unauthorized, invalid or expired refresh token"
//  *       500:
//  *         description: Internal Server Error - Failure during token refresh process
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Error refreshing token"
//  */
// router.get('/refresh-token', refreshToken);
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - auth API
 *     summary: Refresh access token using a valid refresh token
 *     description: This endpoint allows the user to refresh an expired access token by providing a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token provided by the client, used to obtain a new access token.
 *                 example: "your-refresh-token-here"
 *     responses:
 *       200:
 *         description: Access token successfully refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access token refreshed successfully"
 *                 accessToken:
 *                   type: string
 *                   example: "new-access-token-here"
 *       400:
 *         description: Bad Request - Missing or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing or invalid refresh token"
 *       401:
 *         description: Unauthorized - Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, invalid or expired refresh token"
 *       500:
 *         description: Internal Server Error - Failure during token refresh process
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error refreshing token"
 */

router.post('/refresh-token', refreshToken);

router.get('/logout', logoutUser);


export default router;
