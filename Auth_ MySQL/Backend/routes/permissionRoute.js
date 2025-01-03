// import express from 'express';
// const router = express.Router(); 
// // const RolePermission = require('../models/RolePermission');
// const { verifyToken } = require('../middleware/authMiddleware');
// const { checkPermission } = require('../middleware/permission');

// // Assign permissions (SuperAdmin Only)
// router.post('/assign', verifyToken, checkPermission(1, 'can_add'), (req, res) => {
//   const { roleId, permissionCategoryId, canView, canAdd, canEdit, canDelete } = req.body;

//   RolePermission.assignPermission(
//     roleId,
//     permissionCategoryId,
//     canView,
//     canAdd,
//     canEdit,
//     canDelete,
//     (err, results) => {
//       if (err) return res.status(500).send(err);
//       res.send('Permission assigned successfully');
//     }
//   );
// });

// // Get permissions for a role
// router.get('/:roleId', verifyToken, checkPermission(1, 'can_view'), (req, res) => {
//   RolePermission.getPermissionsByRole(req.params.roleId, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// export default router;
import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { authorize,authorizeAdmin } from '../middleware/authRoleMiddleware.js';
import {   getAllPermissions,getAllPermissionsById ,getStaffPermissions} from '../controllers/permissionController.js';

const router = express.Router();

// ✅ Get Permissions (Accessible only to authorized users)
// router.get(
//   '/permissions/:role_id',
//   authenticateUser,
//   authorizePermission('can_view'),
//   getPermissionsByRole
// );


/**
 * @swagger
 * /auth/perm/permission/staff:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get staff permissions
 *     description: Retrieves all permissions assigned to staff roles (1, 2, 3, 4, 5) after authenticating the user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Staff permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "View Dashboard"
 *                   description:
 *                     type: string
 *                     example: "Allows access to the dashboard."
 *       401:
 *         description: Unauthorized, authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden, insufficient role permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Permission denied"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get(
  '/permission/staff',  // get by role with token 
  authenticateUser,
  authorize(), 
  getStaffPermissions         // Controller to fetch all permissions
);


/**
 * @swagger
 * /auth/perm/permission:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get all permissions
 *     description: Retrieves all permissions after authenticating the user and verifying the required roles.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "Manage Users"
 *                   description:
 *                     type: string
 *                     example: "Allows managing user accounts."
 *       401:
 *         description: Unauthorized, authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden, insufficient role permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Permission denied"
 *       500:
 *         description: Internal server error
 */

router.get(
  '/permission',     // fectching all records permission 
  authenticateUser,
  authorizeAdmin(),
  getAllPermissions          // Controller to fetch all permissions
);
// router.put('/roles/:role_id/permissions', bulkUpdatePermissionsForRoleById);

/**
 * @swagger
 * /auth/perm/permission/{role_id}:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get all permissions by role ID
 *     description: Fetches all permissions associated with a specific role using the role ID after authenticating the user and verifying the required roles.
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         description: The ID of the role for which permissions are to be fetched.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all permissions for the given role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   permission_id:
 *                     type: integer
 *                     example: 1
 *                   permission_name:
 *                     type: string
 *                     example: "Manage Users"
 *                   description:
 *                     type: string
 *                     example: "Allows managing user accounts."
 *       401:
 *         description: Unauthorized, authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed"
 *       403:
 *         description: Forbidden, insufficient role permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Permission denied"
 *       404:
 *         description: Not found, the provided role ID does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
 *       500:
 *         description: Internal server error
 */

router.get(
  '/permission/:role_id',     //fetching all records by id 
  authenticateUser,
  authorizeAdmin(),
  getAllPermissionsById          // Controller to fetch all permissions
);


export default router;