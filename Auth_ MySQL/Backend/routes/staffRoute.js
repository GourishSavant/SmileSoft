
import express from 'express';
import {createStaff,getAllStaff,getStaffByFilter,getStaffByRole,updateStaff,deleteStaffHandler,addStaffPassword,staffLogin} from '../controllers/staffController.js';

const router = express.Router();
/**
 * @swagger
 * /staff/create:
 *   post:
 *     tags:
 *       - Staff API
 *     summary: Create a new staff member
 *     description: This endpoint allows administrators to create a new staff member with specific properties like name, email, role, and active status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *               - is_active
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the staff member.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the staff member.
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 description: The role assigned to the staff member.
 *                 example: "Manager"
 *               is_active:
 *                 type: boolean
 *                 description: Indicates if the staff member is active.
 *                 example: true
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Staff member created successfully"
 *                 staff_id:
 *                   type: integer
 *                   example: 456
 *       400:
 *         description: Bad Request - Missing or invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       403:
 *         description: Forbidden - Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to create staff members"
 *       500:
 *         description: Internal Server Error - Unexpected issue on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to create staff member"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.post('/createStaff', createStaff);

/**
 * @swagger
 * /staff/getAll:
 *   get:
 *     tags:
 *       - Staff API
 *     summary: Retrieve all staff members
 *     description: This endpoint retrieves a list of all staff members, including their details such as name, email, role, and active status.
 *     responses:
 *       200:
 *         description: List of staff members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staff_id:
 *                     type: integer
 *                     example: 456
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   role:
 *                     type: string
 *                     example: "Manager"
 *                   is_active:
 *                     type: boolean
 *                     example: true
 *       403:
 *         description: Forbidden - Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to view staff members"
 *       500:
 *         description: Internal Server Error - Unexpected issue on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve staff members"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.get('/getAllStaff', getAllStaff); 

/**
 * @swagger
 * /staff/getByFilter:
 *   get:
 *     tags:
 *       - Staff API
 *     summary: Retrieve staff members by filter
 *     description: This endpoint retrieves staff members based on specific filter criteria such as role, active status, or other parameters.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter staff by role.
 *         example: "Manager"
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter staff by active status.
 *         example: true
 *     responses:
 *       200:
 *         description: Staff members retrieved successfully based on filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staff_id:
 *                     type: integer
 *                     example: 456
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   role:
 *                     type: string
 *                     example: "Manager"
 *                   is_active:
 *                     type: boolean
 *                     example: true
 *       400:
 *         description: Bad Request - Invalid filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid filter parameters"
 *       403:
 *         description: Forbidden - Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to view staff members"
 *       500:
 *         description: Internal Server Error - Unexpected issue on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve staff members"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.get('/getStaffByFilter', getStaffByFilter);

/**
 * @swagger
 * /staff/getByRole:
 *   get:
 *     tags:
 *       - Staff API
 *     summary: Retrieve staff members by role
 *     description: This endpoint retrieves staff members based on their assigned role.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: Role to filter staff members by.
 *         example: "Manager"
 *     responses:
 *       200:
 *         description: Staff members retrieved successfully by role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staff_id:
 *                     type: integer
 *                     example: 456
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   role:
 *                     type: string
 *                     example: "Manager"
 *       400:
 *         description: Bad Request - Missing or invalid role parameter
 *       403:
 *         description: Forbidden - Unauthorized access
 *       500:
 *         description: Internal Server Error
 */


router.get('/getStaffByRole', getStaffByRole);
/**
 * @swagger
 * /staff/create:
 *   post:
 *     tags:
 *       - Staff API
 *     summary: Create a new staff member
 *     description: This endpoint allows administrators to create a new staff member with specific properties like name, email, role, and active status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *               - is_active
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the staff member.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the staff member.
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 description: The role assigned to the staff member.
 *                 example: "Manager"
 *               is_active:
 *                 type: boolean
 *                 description: Indicates if the staff member is active.
 *                 example: true
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Staff member created successfully"
 *                 staff_id:
 *                   type: integer
 *                   example: 456
 *       400:
 *         description: Bad Request - Missing or invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       403:
 *         description: Forbidden - Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to create staff members"
 *       500:
 *         description: Internal Server Error - Unexpected issue on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to create staff member"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.put('/updateStaff/:staff_emp_id', updateStaff);

/**
 * @swagger
 * /staff/delete:
 *   delete:
 *     tags:
 *       - Staff API
 *     summary: Delete a staff member
 *     description: This endpoint allows administrators to delete a staff member based on their unique identifier.
 *     parameters:
 *       - in: query
 *         name: staff_emp_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the staff member to delete.
 *     responses:
 *       200:
 *         description: Staff member deleted successfully
 *       400:
 *         description: Bad Request - Missing or invalid staff_emp_id parameter
 *       403:
 *         description: Forbidden - Unauthorized access
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteStaff', deleteStaffHandler);
/**
 * @swagger
 * /staff/addStaffPassword/{staff_emp_id}:
 *   put:
 *     tags:
 *       - Staff API
 *     summary: Add or update the password for a staff member
 *     description: This endpoint allows administrators to add or update the password of a staff member based on their unique employee ID.
 *     parameters:
 *       - in: path
 *         name: staff_emp_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the staff member to update the password for.
 *       - in: body
 *         name: password
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               description: The new password for the staff member.
 *               example: "newPassword123"
 *         required: true
 *         description: The new password to be set for the staff member.
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad Request - Missing or invalid parameters
 *       403:
 *         description: Forbidden - Unauthorized access
 *       404:
 *         description: Not Found - Staff member with the provided employee ID not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/addStaffPassword/:staff_emp_id', addStaffPassword);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - staff login
 *     summary:  Login
 *     description: Authenticate staff members using their credentials to obtain an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Staff member's username or email.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Staff member's password.
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Login successful, returns access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 expiresIn:
 *                   type: integer
 *                   description: Token expiration time in seconds.
 *                   example: 3600
 *       400:
 *         description: Bad Request - Invalid login credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid username or password."
 *       401:
 *         description: Unauthorized - Authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed. Please try again."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while processing the login request."
 */

router.get('/login', staffLogin);

export default router;