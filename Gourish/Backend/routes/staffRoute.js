
// import express from 'express';
// import {createStaff,getAllStaff,getStaffByFilter,getStaffByRole,updateStaff,deleteStaffHandler,addStaffPassword,staffLogin} from '../controllers/staffController.js';

// const router = express.Router();
// /**
//  * @swagger
//  * /staff/create:
//  *   post:
//  *     tags:
//  *       - Staff API
//  *     summary: Create a new staff member
//  *     description: This endpoint allows administrators to create a new staff member with specific properties like name, email, role, and active status.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - role
//  *               - is_active
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: The full name of the staff member.
//  *                 example: "John Doe"
//  *               email:
//  *                 type: string
//  *                 description: The email address of the staff member.
//  *                 example: "john.doe@example.com"
//  *               role:
//  *                 type: string
//  *                 description: The role assigned to the staff member.
//  *                 example: "Manager"
//  *               is_active:
//  *                 type: boolean
//  *                 description: Indicates if the staff member is active.
//  *                 example: true
//  *     responses:
//  *       201:
//  *         description: Staff member created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: "Staff member created successfully"
//  *                 staff_id:
//  *                   type: integer
//  *                   example: 456
//  *       400:
//  *         description: Bad Request - Missing or invalid input data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "All fields are required"
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "You are not authorized to create staff members"
//  *       500:
//  *         description: Internal Server Error - Unexpected issue on the server
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "Failed to create staff member"
//  *                 error:
//  *                   type: string
//  *                   example: "Database connection failed"
//  */

// router.post('/createStaff', createStaff);

// /**
//  * @swagger
//  * /staff/getAll:
//  *   get:
//  *     tags:
//  *       - Staff API
//  *     summary: Retrieve all staff members
//  *     description: This endpoint retrieves a list of all staff members, including their details such as name, email, role, and active status.
//  *     responses:
//  *       200:
//  *         description: List of staff members retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   staff_id:
//  *                     type: integer
//  *                     example: 456
//  *                   name:
//  *                     type: string
//  *                     example: "John Doe"
//  *                   email:
//  *                     type: string
//  *                     example: "john.doe@example.com"
//  *                   role:
//  *                     type: string
//  *                     example: "Manager"
//  *                   is_active:
//  *                     type: boolean
//  *                     example: true
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "You are not authorized to view staff members"
//  *       500:
//  *         description: Internal Server Error - Unexpected issue on the server
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "Failed to retrieve staff members"
//  *                 error:
//  *                   type: string
//  *                   example: "Database connection failed"
//  */

// router.get('/getAllStaff', getAllStaff); 

// /**
//  * @swagger
//  * /staff/getByFilter:
//  *   get:
//  *     tags:
//  *       - Staff API
//  *     summary: Retrieve staff members by filter
//  *     description: This endpoint retrieves staff members based on specific filter criteria such as role, active status, or other parameters.
//  *     parameters:
//  *       - in: query
//  *         name: role
//  *         schema:
//  *           type: string
//  *         description: Filter staff by role.
//  *         example: "Manager"
//  *       - in: query
//  *         name: is_active
//  *         schema:
//  *           type: boolean
//  *         description: Filter staff by active status.
//  *         example: true
//  *     responses:
//  *       200:
//  *         description: Staff members retrieved successfully based on filters
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   staff_id:
//  *                     type: integer
//  *                     example: 456
//  *                   name:
//  *                     type: string
//  *                     example: "John Doe"
//  *                   email:
//  *                     type: string
//  *                     example: "john.doe@example.com"
//  *                   role:
//  *                     type: string
//  *                     example: "Manager"
//  *                   is_active:
//  *                     type: boolean
//  *                     example: true
//  *       400:
//  *         description: Bad Request - Invalid filter criteria
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "Invalid filter parameters"
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "You are not authorized to view staff members"
//  *       500:
//  *         description: Internal Server Error - Unexpected issue on the server
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "Failed to retrieve staff members"
//  *                 error:
//  *                   type: string
//  *                   example: "Database connection failed"
//  */

// router.get('/getStaffByFilter', getStaffByFilter);

// /**
//  * @swagger
//  * /staff/getByRole:
//  *   get:
//  *     tags:
//  *       - Staff API
//  *     summary: Retrieve staff members by role
//  *     description: This endpoint retrieves staff members based on their assigned role.
//  *     parameters:
//  *       - in: query
//  *         name: role
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Role to filter staff members by.
//  *         example: "Manager"
//  *     responses:
//  *       200:
//  *         description: Staff members retrieved successfully by role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   staff_id:
//  *                     type: integer
//  *                     example: 456
//  *                   name:
//  *                     type: string
//  *                     example: "John Doe"
//  *                   email:
//  *                     type: string
//  *                     example: "john.doe@example.com"
//  *                   role:
//  *                     type: string
//  *                     example: "Manager"
//  *       400:
//  *         description: Bad Request - Missing or invalid role parameter
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *       500:
//  *         description: Internal Server Error
//  */

// router.get('/getStaffByRole', getStaffByRole);
// /**
//  * @swagger
//  * /staff/create:
//  *   post:
//  *     tags:
//  *       - Staff API
//  *     summary: Create a new staff member
//  *     description: This endpoint allows administrators to create a new staff member with specific properties like name, email, role, and active status.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - role
//  *               - is_active
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: The full name of the staff member.
//  *                 example: "John Doe"
//  *               email:
//  *                 type: string
//  *                 description: The email address of the staff member.
//  *                 example: "john.doe@example.com"
//  *               role:
//  *                 type: string
//  *                 description: The role assigned to the staff member.
//  *                 example: "Manager"
//  *               is_active:
//  *                 type: boolean
//  *                 description: Indicates if the staff member is active.
//  *                 example: true
//  *     responses:
//  *       201:
//  *         description: Staff member created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: "Staff member created successfully"
//  *                 staff_id:
//  *                   type: integer
//  *                   example: 456
//  *       400:
//  *         description: Bad Request - Missing or invalid input data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "All fields are required"
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "You are not authorized to create staff members"
//  *       500:
//  *         description: Internal Server Error - Unexpected issue on the server
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: false
//  *                 message:
//  *                   type: string
//  *                   example: "Failed to create staff member"
//  *                 error:
//  *                   type: string
//  *                   example: "Database connection failed"
//  */

// router.put('/updateStaff/:staff_emp_id', updateStaff);

// /**
//  * @swagger
//  * /staff/delete:
//  *   delete:
//  *     tags:
//  *       - Staff API
//  *     summary: Delete a staff member
//  *     description: This endpoint allows administrators to delete a staff member based on their unique identifier.
//  *     parameters:
//  *       - in: query
//  *         name: staff_emp_id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Unique identifier of the staff member to delete.
//  *     responses:
//  *       200:
//  *         description: Staff member deleted successfully
//  *       400:
//  *         description: Bad Request - Missing or invalid staff_emp_id parameter
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *       500:
//  *         description: Internal Server Error
//  */

// router.delete('/deleteStaff', deleteStaffHandler);
// /**
//  * @swagger
//  * /staff/addStaffPassword/{staff_emp_id}:
//  *   put:
//  *     tags:
//  *       - Staff API
//  *     summary: Add or update the password for a staff member
//  *     description: This endpoint allows administrators to add or update the password of a staff member based on their unique employee ID.
//  *     parameters:
//  *       - in: path
//  *         name: staff_emp_id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Unique identifier of the staff member to update the password for.
//  *       - in: body
//  *         name: password
//  *         schema:
//  *           type: object
//  *           properties:
//  *             password:
//  *               type: string
//  *               description: The new password for the staff member.
//  *               example: "newPassword123"
//  *         required: true
//  *         description: The new password to be set for the staff member.
//  *     responses:
//  *       200:
//  *         description: Password updated successfully
//  *       400:
//  *         description: Bad Request - Missing or invalid parameters
//  *       403:
//  *         description: Forbidden - Unauthorized access
//  *       404:
//  *         description: Not Found - Staff member with the provided employee ID not found
//  *       500:
//  *         description: Internal Server Error
//  */

// router.put('/addStaffPassword/:staff_emp_id', addStaffPassword);
// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     tags:
//  *       - staff login
//  *     summary:  Login
//  *     description: Authenticate staff members using their credentials to obtain an access token.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 description: Staff member's username or email.
//  *                 example: "john.doe@example.com"
//  *               password:
//  *                 type: string
//  *                 description: Staff member's password.
//  *                 example: "SecurePassword123"
//  *     responses:
//  *       200:
//  *         description: Login successful, returns access token.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 accessToken:
//  *                   type: string
//  *                   description: JWT access token for authenticated access.
//  *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *                 expiresIn:
//  *                   type: integer
//  *                   description: Token expiration time in seconds.
//  *                   example: 3600
//  *       400:
//  *         description: Bad Request - Invalid login credentials.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Invalid username or password."
//  *       401:
//  *         description: Unauthorized - Authentication failed.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Authentication failed. Please try again."
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "An error occurred while processing the login request."
//  */

// router.get('/login', staffLogin);

// export default router;


import express from 'express';
import multer from 'multer';
import {createStaff,getAllStaff,getStaffByFilter,getStaffByRole,updateStaff,deleteStaffHandler,addStaffPassword,staffLogin,staffRefreshToken,staffLogout} from '../controllers/staffController.js';
import  { authenticate, authorize, authorizeAdmin } from "../middleware/authRoleMiddleware.js";
import {checkCreatePermissionForRole,checkDeletePermissionForRole,checkEditPermissionForRole, checkviewPermissionForRole} from "../middleware/checkforPermission.js";
const router = express.Router();
// const multer = require('multer');


// Set up storage options for multer
const storage = multer.memoryStorage(); // or configure disk storage as needed
const upload = multer({ storage: storage }); // You can add limits or other options if required

/**
 * @swagger
 * /auth/createStaff:
 *   post:
 *     tags:
 *       - Staff API
 *     summary: Create a new staff member
 *     description: This endpoint allows administrators to create a new staff member with specific properties like name, email, role, and active status.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - email
 *               - role
 *               - is_active
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 description: The unique identifier of the staff member.
 *                 example: 1027
 *               role:
 *                 type: string
 *                 description: The role assigned to the staff member.
 *                 example: "Teacher"
 *               designation:
 *                 type: string
 *                 description: The designation of the staff member.
 *                 example: "Software Engineer"
 *               department:
 *                 type: string
 *                 description: The department the staff member belongs to.
 *                 example: "Information Technology"
 *               first_name:
 *                 type: string
 *                 description: The first name of the staff member.
 *                 example: "Yash"
 *               last_name:
 *                 type: string
 *                 description: The last name of the staff member.
 *                 example: null
 *               father_name:
 *                 type: string
 *                 description: The father's name of the staff member.
 *                 example: "Ram"
 *               mother_name:
 *                 type: string
 *                 description: The mother's name of the staff member.
 *                 example: null
 *               email:
 *                 type: string
 *                 description: The email address of the staff member.
 *                 example: "yash@gmail.com"
 *               gender:
 *                 type: string
 *                 description: The gender of the staff member.
 *                 example: "Male"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the staff member.
 *                 example: "2000-12-25"
 *               doj:
 *                 type: string
 *                 format: date
 *                 description: The date of joining of the staff member.
 *                 example: null
 *               phone_no:
 *                 type: string
 *                 description: The phone number of the staff member.
 *                 example: null
 *               emergency_contact_no:
 *                 type: string
 *                 description: The emergency contact number of the staff member.
 *                 example: null
 *               marital_status:
 *                 type: string
 *                 description: The marital status of the staff member.
 *                 example: null
 *               photo:
 *                 type: string
 *                 description: The photo of the staff member.
 *                 example: null
 *               address:
 *                 type: string
 *                 description: The current address of the staff member.
 *                 example: null
 *               permanent_address:
 *                 type: string
 *                 description: The permanent address of the staff member.
 *                 example: null
 *               qualification:
 *                 type: string
 *                 description: The highest qualification of the staff member.
 *                 example: null
 *               work_exp:
 *                 type: string
 *                 description: The work experience of the staff member.
 *                 example: null
 *               note:
 *                 type: string
 *                 description: Additional notes about the staff member.
 *                 example: null
 *               epf_no:
 *                 type: string
 *                 description: The EPF number of the staff member.
 *                 example: null
 *               basic_salary:
 *                 type: number
 *                 description: The basic salary of the staff member.
 *                 example: null
 *               contract_type:
 *                 type: string
 *                 description: The contract type for the staff member.
 *                 example: null
 *               work_shift:
 *                 type: string
 *                 description: The work shift assigned to the staff member.
 *                 example: null
 *               work_location:
 *                 type: string
 *                 description: The work location of the staff member.
 *                 example: null
 *               account_title:
 *                 type: string
 *                 description: The account title of the staff member.
 *                 example: null
 *               account_no:
 *                 type: string
 *                 description: The account number of the staff member.
 *                 example: null
 *               bank_name:
 *                 type: string
 *                 description: The bank name of the staff member.
 *                 example: null
 *               ifsc_code:
 *                 type: string
 *                 description: The IFSC code of the staff member's bank branch.
 *                 example: null
 *               bank_branch:
 *                 type: string
 *                 description: The bank branch of the staff member.
 *                 example: null
 *               facebook_url:
 *                 type: string
 *                 description: The Facebook URL of the staff member.
 *                 example: null
 *               twitter_url:
 *                 type: string
 *                 description: The Twitter URL of the staff member.
 *                 example: null
 *               linkedin_url:
 *                 type: string
 *                 description: The LinkedIn URL of the staff member.
 *                 example: null
 *               instagram_url:
 *                 type: string
 *                 description: The Instagram URL of the staff member.
 *                 example: null
 *               resume:
 *                 type: string
 *                 description: The resume of the staff member.
 *                 example: null
 *               joining_letter:
 *                 type: string
 *                 description: The joining letter of the staff member.
 *                 example: null
 *               resignation_letter:
 *                 type: string
 *                 description: The resignation letter of the staff member.
 *                 example: null
 *               other_documents:
 *                 type: string
 *                 description: Any other documents related to the staff member.
 *                 example: null
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
 *                   example: 1027
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
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// router.post('/roles',authenticate,  // First, authenticate the user
//     authorize(['1', '2']), createRole);        // Create Role
router.post('/createStaff', authenticate, authorize(),checkCreatePermissionForRole,upload.none(), createStaff);
/**
 * @swagger
 * /auth/getAllStaff:
 *   get:cd
 *     tags:
 *       - Staff API
 *     summary: Retrieve all staff members
 *     description: This endpoint retrieves a list of all staff members, including their details such as name, email, role, and active status.
 *     security:
 *       - BearerAuth: []
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
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/getAllStaff',authenticate, authorize(),checkviewPermissionForRole, getAllStaff);
/**
 * @swagger
 * /staff/getByFilter:
 *   get:
 *     tags:
 *       - Staff API
 *     summary: Retrieve staff members by filter
 *     description: This endpoint retrieves staff members based on specific filter criteria such as role, active status, or other parameters.
 *     security:
 *       - BearerAuth: []
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
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/getStaffByFilter',authenticate, authorize(),checkviewPermissionForRole, getStaffByFilter);
/**
 * @swagger
 * /auth/updateStaff/{staff_emp_id}:
 *   put:
 *     tags:
 *       - Staff API
 *     summary: Update staff member details by staff ID
 *     description: This endpoint allows administrators to update an existing staff member's details using their staff ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: staff_emp_id
 *         in: path
 *         required: true
 *         description: The unique ID of the staff member.
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 description: Unique staff ID.
 *                 example: 1003
 *               role:
 *                 type: string
 *                 description: The role of the staff member.
 *                 example: "Teacher"
 *               designation:
 *                 type: string
 *                 description: Staff member's designation.
 *                 example: "Software Engineer"
 *               department:
 *                 type: string
 *                 description: Department name.
 *                 example: "Information Technology"
 *               first_name:
 *                 type: string
 *                 description: Staff member's first name.
 *                 example: "abcd"
 *               last_name:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's last name.
 *                 example: null
 *               father_name:
 *                 type: string
 *                 description: Staff member's father's name.
 *                 example: "Ram"
 *               mother_name:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's mother's name.
 *                 example: null
 *               email:
 *                 type: string
 *                 description: Staff member's email address.
 *                 example: "yash@gmail.com"
 *               gender:
 *                 type: string
 *                 description: Staff member's gender.
 *                 example: "Male"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Staff member's date of birth.
 *                 example: "2000-12-25"
 *               doj:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 description: Staff member's date of joining.
 *                 example: null
 *               phone_no:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's phone number.
 *                 example: null
 *               emergency_contact_no:
 *                 type: string
 *                 nullable: true
 *                 description: Emergency contact number.
 *                 example: null
 *               marital_status:
 *                 type: string
 *                 nullable: true
 *                 description: Marital status of the staff member.
 *                 example: null
 *               address:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's current address.
 *                 example: null
 *               permanent_address:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's permanent address.
 *                 example: null
 *               qualification:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's qualification details.
 *                 example: null
 *               work_exp:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's work experience.
 *                 example: null
 *               basic_salary:
 *                 type: number
 *                 nullable: true
 *                 description: Staff member's basic salary.
 *                 example: null
 *               contract_type:
 *                 type: string
 *                 nullable: true
 *                 description: Contract type of the staff member.
 *                 example: null
 *               bank_name:
 *                 type: string
 *                 nullable: true
 *                 description: Bank name for salary account.
 *                 example: null
 *               account_no:
 *                 type: string
 *                 nullable: true
 *                 description: Staff member's bank account number.
 *                 example: null
 *               ifsc_code:
 *                 type: string
 *                 nullable: true
 *                 description: IFSC code of the bank.
 *                 example: null
 *               facebook_url:
 *                 type: string
 *                 nullable: true
 *                 description: Facebook profile URL.
 *                 example: null
 *               twitter_url:
 *                 type: string
 *                 nullable: true
 *                 description: Twitter profile URL.
 *                 example: null
 *               linkedin_url:
 *                 type: string
 *                 nullable: true
 *                 description: LinkedIn profile URL.
 *                 example: null
 *               instagram_url:
 *                 type: string
 *                 nullable: true
 *                 description: Instagram profile URL.
 *                 example: null
 *               resume:
 *                 type: string
 *                 nullable: true
 *                 description: Resume document URL.
 *                 example: null
 *               joining_letter:
 *                 type: string
 *                 nullable: true
 *                 description: Joining letter document URL.
 *                 example: null
 *               resignation_letter:
 *                 type: string
 *                 nullable: true
 *                 description: Resignation letter document URL.
 *                 example: null
 *               other_documents:
 *                 type: string
 *                 nullable: true
 *                 description: Any other related documents.
 *                 example: null
 *     responses:
 *       200:
 *         description: Staff member details updated successfully.
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
 *                   example: "Staff member updated successfully"
 *       400:
 *         description: Bad Request - Invalid input data.
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
 *                   example: "Invalid staff details"
 *       403:
 *         description: Forbidden - Unauthorized access.
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
 *                   example: "You are not authorized to update staff details"
 *       500:
 *         description: Internal Server Error - Failed to update staff details.
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
 *                   example: "Failed to update staff member"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.put('/updateStaff/:staff_emp_id',authenticate, authorize(),checkEditPermissionForRole,updateStaff);
/**
 * @swagger
 * /auth/deleteStaff:
 *   delete:
 *     tags:
 *       - Staff API
 *     summary: Delete a staff member
 *     description: This endpoint allows administrators to delete a staff member based on their unique identifier.
 *     security:
 *       - BearerAuth: []
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
 *     components:
 *       securitySchemes:
 *         BearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

router.delete('/deleteStaff',authenticate, authorize(), checkDeletePermissionForRole,deleteStaffHandler);
/**
 * @swagger
 /staff/addStaffPassword/{staff_emp_id}:
    put:
      tags:
        - Staff API
      summary: Add or update the password for a staff member
      description: This endpoint allows administrators to add or update the password of a staff member based on their unique employee ID.
      security:
        - BearerAuth: []  # This ensures Bearer Authentication is required
      parameters:
        - in: path
          name: staff_emp_id
          schema:
            type: string
          required: true
          description: Unique identifier of the staff member to update the password for.
        - in: body
          name: password
          schema:
            type: object
            properties:
              password:
                type: string
                description: The new password for the staff member.
                example: "newPassword123"
          required: true
          description: The new password to be set for the staff member.
      responses:
        200:
          description: Password updated successfully
        400:
          description: Bad Request - Missing or invalid parameters
        403:
          description: Forbidden - Unauthorized access
        404:
          description: Not Found - Staff member with the provided employee ID not found
        500:
          description: Internal Server Error
 */
router.put('/addStaffPassword/:staff_emp_id',authenticate, authorizeAdmin(),checkEditPermissionForRole, addStaffPassword);


router.get('/staffRefreshToken', staffRefreshToken);
router.get('/staffLogout', staffLogout);
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
 *               email:
 *                 type: string
 *                 description: Staff member's email address.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Staff member's password.
 *                 example: "1234"
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
 *                   example: "Invalid email or password."
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
router.post('/login', staffLogin);


export default router;