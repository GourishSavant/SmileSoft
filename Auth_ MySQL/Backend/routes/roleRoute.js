// routes/roleRoutes.js
import express from 'express';
import { createRole } from '../controllers/roleController.js'; // Use ES module import
import {getAllRoles} from '../controllers/roleController.js';
import {getRoleByName} from '../controllers/roleController.js';
import {updateRole} from '../controllers/roleController.js';
import {deleteRole} from '../controllers/roleController.js';
import {getPermissionsByRole} from '../controllers/permissionController.js';

// import {updatePermissionsForRole} from '../controllers/permissionController.js';
// import {assignPermission} from '../controllers/permissionController.js'
// import {bulkUpdatePermissionsForRoleByNames} from '../controllers/permissionController.js';
// import { authenticate } from '../middleware/authRoleMiddleware.js';
import { authorizeRole } from '../middleware/authAdminMiddleware.js';
import {bulkUpdatePermissionsForRoleById} from '../controllers/permissionController.js';
// import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import {getRoleById} from '../controllers/roleController.js';
import  { authenticate, authorize } from "../middleware/authRoleMiddleware.js";

const router = express.Router();

// Role Routes
/**
 * @swagger
 * /roles/v1/create:
 *   post:
 *     tags:
 *       - Roles API
 *     summary: Create a new role
 *     description: This endpoint allows administrators to create a new role with specific properties like name, active status, system role flag, and admin privileges.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - is_active
 *               - is_system
 *               - is_admin
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role.
 *                 example: "Manager"
 *               is_active:
 *                 type: boolean
 *                 description: Indicates if the role is active.
 *                 example: true
 *               is_system:
 *                 type: boolean
 *                 description: Indicates if the role is a system role.
 *                 example: false
 *               is_admin:
 *                 type: boolean
 *                 description: Indicates if the role has admin privileges.
 *                 example: false
 *     responses:
 *       201:
 *         description: Role created successfully
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
 *                   example: "Role created successfully"
 *                 role_id:
 *                   type: integer
 *                   example: 123
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
 *                   example: "You are not authorized to create roles"
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
 *                   example: "Failed to create role"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */


// Example usage
// router.post('/roles', authenticateToken, authorizeRoles('admin', 'super_admin'), createRole);


router.post('/roles',authenticate,  // First, authenticate the user
    authorize(['1', '2']), createRole);        // Create Role
// router.get('/roles', getRoles);  
/**
 * @swagger
 * /roles/v1/all:
 *   get:
 *     tags:
 *       - Roles API
 *     summary: Retrieve all roles
 *     description: This endpoint allows administrators to retrieve all available roles in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   role_id:
 *                     type: integer
 *                     description: The unique identifier of the role
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the role
 *                     example: "Manager"
 *                   is_active:
 *                     type: boolean
 *                     description: The status of the role (active/inactive)
 *                     example: true
 *                   is_system:
 *                     type: boolean
 *                     description: Indicates whether the role is a system role
 *                     example: false
 *                   is_admin:
 *                     type: boolean
 *                     description: Indicates whether the role has admin privileges
 *                     example: false
 *       404:
 *         description: No roles found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Roles not found"
 *       500:
 *         description: Internal Server Error - Unable to retrieve roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching roles"
 *                 details:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.get('/getRoles', getAllRoles);
/**
 * @swagger
 * /roles/v1/{role_id}:
 *   get:
 *     tags:
 *       - Roles API
 *     summary: Retrieve a role by its ID
 *     description: This endpoint allows you to fetch a specific role by its unique ID.
 *     parameters:
 *       - name: role_id
 *         in: path
 *         required: true
 *         description: The ID of the role to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the role
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
 *                   example: "Role retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role_id:
 *                       type: integer
 *                       description: The unique identifier of the role
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the role
 *                       example: "Manager"
 *                     is_active:
 *                       type: boolean
 *                       description: The status of the role (active/inactive)
 *                       example: true
 *                     is_system:
 *                       type: boolean
 *                       description: Indicates whether the role is a system role
 *                       example: false
 *                     is_admin:
 *                       type: boolean
 *                       description: Indicates whether the role has admin privileges
 *                       example: false
 *       404:
 *         description: Role not found
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
 *                   example: "Role not found"
 *       500:
 *         description: Internal Server Error - Unable to retrieve role
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
 *                   example: "Failed to fetch role"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.get('/getRoleById/:role_id', getRoleById);
/**
 * @swagger
 * /roles/v1/{role_id}:
 *   put:
 *     tags:
 *       - Roles API
 *     summary: Update an existing role by ID
 *     description: This endpoint allows you to update an existing role's details like name, slug, status, and privileges.
 *     parameters:
 *       - name: role_id
 *         in: path
 *         required: true
 *         description: The ID of the role to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 description: The slug for the role
 *                 example: "role-manager"
 *               name:
 *                 type: string
 *                 description: The name of the role
 *                 example: "Manager"
 *               is_active:
 *                 type: boolean
 *                 description: The active status of the role
 *                 default: true
 *                 example: true
 *               is_system:
 *                 type: boolean
 *                 description: Whether the role is a system role
 *                 default: true
 *                 example: true
 *               is_admin:
 *                 type: boolean
 *                 description: Whether the role has admin privileges
 *                 default: false
 *                 example: false
 *     responses:
 *       200:
 *         description: Successfully updated the role
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
 *                   example: "Role updated successfully"
 *       400:
 *         description: Bad Request - Missing required fields (Role ID, Name)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role ID is required"
 *       403:
 *         description: Forbidden - Editing the 'Super Admin' role is not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Edit of Super Admin role is not allowed"
 *       404:
 *         description: Not Found - Role not found or not updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found or not updated"
 *       500:
 *         description: Internal Server Error - Failed to update role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role updation failed"
 *                 details:
 *                   type: string
 *                   example: "Database connection failed"
 */

router.put('/editRole/:role_id', updateRole);
// router.put('/roles/:role_id', authenticateToken, authorizeRoles('admin', 'super_admin'), updateRole);

/**
 * @swagger
 * /roles/v1/{role_id}:
 *   delete:
 *     tags:
 *       - Roles API
 *     summary: Delete a role by role ID
 *     description: This endpoint allows you to delete a role by its unique ID, preventing the deletion of critical roles like "admin", "super admin", etc.
 *     parameters:
 *       - name: role_id
 *         in: path
 *         required: true
 *         description: The unique ID of the role to delete
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully deleted the role
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
 *                   example: "Role with ID '5' deleted successfully"
 *       400:
 *         description: Bad Request - Role ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role ID is required"
 *       403:
 *         description: Forbidden - Deletion of protected roles is not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Deletion of protected roles is not allowed"
 *       404:
 *         description: Not Found - Role not found or already deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role with ID '5' not found or already deleted"
 *       500:
 *         description: Internal Server Error - Failed to delete the role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role deletion failed"
 *                 details:
 *                   type: string
 *                   example: "Database error"
 */

router.delete('/roles/:role_id', deleteRole);
// router.delete('/roles/:role_id', authenticateToken, authorizeRoles('super_admin'), deleteRole);
// /**
//  * @swagger
//  * /roles/v1/{name}:
//  *   get:
//  *     tags:
//  *       - Roles API
//  *     summary: Get a role by name
//  *     description: This endpoint allows you to retrieve a role by its name.
//  *     parameters:
//  *       - name: name
//  *         in: path
//  *         required: true
//  *         description: The name of the role to retrieve
//  *         schema:
//  *           type: string
//  *           example: "manager"
//  *     responses:
//  *       200:
//  *         description: Role retrieved successfully
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
//  *                   example: "Role retrieved successfully"
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     role_id:
//  *                       type: integer
//  *                       example: 1
//  *                     name:
//  *                       type: string
//  *                       example: "manager"
//  *                     slug:
//  *                       type: string
//  *                       example: "manager_slug"
//  *                     is_active:
//  *                       type: integer
//  *                       example: 1
//  *                     is_system:
//  *                       type: integer
//  *                       example: 1
//  *                     is_admin:
//  *                       type: integer
//  *                       example: 0
//  *       400:
//  *         description: Bad Request - Invalid role name
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Role name is required"
//  *       404:
//  *         description: Not Found - Role not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Role 'manager' not found"
//  *       500:
//  *         description: Internal Server Error - Failed to fetch role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Failed to fetch role"
//  *                 details:
//  *                   type: string
//  *                   example: "Database error"
//  */

router.get('/roles/name/:name', getRoleByName);
// /**
//  * @swagger
//  * /roles/permissions/{role_id}:
//  *   get:
//  *     tags:
//  *       - Role_Permission API
//  *     summary: Retrieve permissions for a specific role
//  *     description: This endpoint allows you to fetch the permissions assigned to a specific role by its unique role ID.
//  *     parameters:
//  *       - name: role_id
//  *         in: path
//  *         required: true
//  *         description: The unique identifier of the role to retrieve permissions for
//  *         schema:
//  *           type: integer
//  *           example: 1
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved the permissions for the role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   permission_id:
//  *                     type: integer
//  *                     description: The unique identifier of the permission
//  *                     example: 101
//  *                   permission_name:
//  *                     type: string
//  *                     description: The name of the permission
//  *                     example: "read_only"
//  *                   description:
//  *                     type: string
//  *                     description: A brief description of the permission
//  *                     example: "Allows read-only access"
//  *       404:
//  *         description: Role not found or no permissions assigned
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Permissions not found for the role"
//  *       500:
//  *         description: Internal Server Error - Unable to retrieve permissions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Failed to fetch permissions"
//  *                 details:
//  *                   type: string
//  *                   example: "Database connection failed"
//  *     security:
//  *       - BearerAuth: []
//  *
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  */


router.get('/permissions/:role_id',   authenticate, 
    authorize([1, 2]), getPermissionsByRole);


// /**
//  * @swagger
//  * /roles/v1/{name}/permissions:
//  *   put:
//  *     tags:
//  *       - Role_Permission API
//  *     summary: Bulk update permissions for a role by name
//  *     description: This endpoint allows you to update multiple permissions for a specific role by its name.
//  *     parameters:
//  *       - name: name
//  *         in: path
//  *         required: true
//  *         description: The name of the role to update permissions for
//  *         schema:
//  *           type: string
//  *           example: "manager"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - permissions
//  *             properties:
//  *               permissions:
//  *                 type: array
//  *                 description: An array of permission objects to update for the role
//  *                 items:
//  *                   type: object
//  *                   required:
//  *                     - name
//  *                     - can_view
//  *                     - can_add
//  *                     - can_edit
//  *                     - can_delete
//  *                   properties:
//  *                     name:
//  *                       type: string
//  *                       description: The name of the permission category
//  *                       example: "view_dashboard"
//  *                     can_view:
//  *                       type: boolean
//  *                       description: Whether the role can view the permission
//  *                       example: true
//  *                     can_add:
//  *                       type: boolean
//  *                       description: Whether the role can add the permission
//  *                       example: true
//  *                     can_edit:
//  *                       type: boolean
//  *                       description: Whether the role can edit the permission
//  *                       example: false
//  *                     can_delete:
//  *                       type: boolean
//  *                       description: Whether the role can delete the permission
//  *                       example: false
//  *     responses:
//  *       200:
//  *         description: Successfully updated the permissions for the role
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Permissions updated successfully"
//  *                 affectedRows:
//  *                   type: integer
//  *                   example: 3
//  *                 name:
//  *                   type: string
//  *                   example: "manager"
//  *                 permissions:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       permission_category_id:
//  *                         type: integer
//  *                         example: 2
//  *                       can_view:
//  *                         type: boolean
//  *                         example: true
//  *                       can_add:
//  *                         type: boolean
//  *                         example: true
//  *                       can_edit:
//  *                         type: boolean
//  *                         example: false
//  *                       can_delete:
//  *                         type: boolean
//  *                         example: false
//  *       400:
//  *         description: Bad Request - Invalid permissions data (expected an array of permission objects)
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Invalid permissions data. Expected an array of permission objects."
//  *       404:
//  *         description: Not Found - Role or permission category not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Role not found with the given name"
//  *       500:
//  *         description: Internal Server Error - Unable to update permissions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Failed to bulk update permissions for role"
//  *                 details:
//  *                   type: string
//  *                   example: "Database connection failed"
//  */

// router.put('/roles/:name/permissions', bulkUpdatePermissionsForRoleByNames);
/**
 * @swagger
 * /roles/v1/permissions/{role_id}:
 *   put:
 *     tags:
 *       - Role_Permission API
 *     summary: Bulk update role permissions by role ID
 *     description: This endpoint allows bulk updating of permissions for a specific role using its role ID.
 *     parameters:
 *       - name: role_id
 *         in: path
 *         required: true
 *         description: The unique ID of the role.
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissions:
 *                 type: array
 *                 description: Array of permission objects to update.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "dashboard"
 *                     can_view:
 *                       type: boolean
 *                       example: true
 *                     can_add:
 *                       type: boolean
 *                       example: false
 *                     can_edit:
 *                       type: boolean
 *                       example: true
 *                     can_delete:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permissions updated successfully"
 *                 affectedRows:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Bad Request - Invalid permissions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid permissions data. Expected an array of permission objects."
 *       404:
 *         description: Not Found - Role or permission category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found with the given ID"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to bulk update permissions for role"
 *     security:
 *       - BearerAuth: []
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


// app.put('/roles/:name/permissions', authenticate, authorizeRole(['admin', 'superadmin']), bulkUpdatePermissionsForRoleByNames);
// router.put('/roles/:role_id/permissions', bulkUpdatePermissionsForRoleById);
router.put(
    '/roles/:role_id/permissions', 
    authenticate, 
    authorize([1, 2]), 
    bulkUpdatePermissionsForRoleById
  );
// router.put('/roles/permissions/:role_id', bulkUpdatePermissionsForRoleById);


export default router;
