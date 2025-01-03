// export default router;
import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { checkAndTakeActionOnPermission } from '../middleware/checkforPermission.js';
import {createPermission,updatePermission,deletePermission} from '../controllers/permissionCheckController.js';
//import {   getAllPermissions,getAllPermissionsById ,getStaffPermissions} from '../controllers/permissionController.js';

const router = express.Router();

let can_create,can_edit,can_delete = 1;
// /**
//  * @swagger
//  * /permissions/create:
//  *   post:
//  *     tags:
//  *       - Permissions API
//  *     summary: Create permission dynamically based on category
//  *     description: Dynamically process permissions based on `permission_category_id` and execute specific actions.
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               permission_category_id:
//  *                 type: integer
//  *                 description: Category ID of the permission
//  *                 example: 1
//  *               feature:
//  *                 type: object
//  *                 description: Additional data for the feature
//  *                 example:
//  *                   name: "admission"
//  *                   value: "enquiry"
//  *     responses:
//  *       201:
//  *         description: Successfully processed the permission action
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Permission action successfully executed"
//  *                 data:
//  *                   type: object
//  *       400:
//  *         description: Bad Request - Missing required fields
//  *       404:
//  *         description: Data not found
//  *       500:
//  *         description: Internal Server Error
//  */

router.post(
  '/permis',
  authenticateUser,
  checkAndTakeActionOnPermission,
  createPermission
);
// /**
//  * @swagger
//  *  /permissions/update:
//  *   put:
//  *     tags:
//  *       - Permissions API
//  *     summary: Update an existing permission
//  *     description: Updates an existing permission after authenticating the user and verifying required conditions.
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: string
//  *                 description: The unique identifier of the permission to update.
//  *                 example: "12345"
//  *               name:
//  *                 type: string
//  *                 description: The updated name of the permission.
//  *                 example: "Updated Permission Name"
//  *               description:
//  *                 type: string
//  *                 description: An updated brief description of the permission.
//  *                 example: "This permission allows updated access to resources."
//  *     responses:
//  *       200:
//  *         description: Permission updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                   description: The unique identifier of the updated permission.
//  *                   example: "12345"
//  *                 name:
//  *                   type: string
//  *                   example: "Updated Permission Name"
//  *                 description:
//  *                   type: string
//  *                   example: "This permission allows updated access to resources."
//  *       400:
//  *         description: Bad request, validation failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Validation failed"
//  *       401:
//  *         description: Unauthorized, authentication failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Authentication failed"
//  *       403:
//  *         description: Forbidden, permission denied
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Permission denied"
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Internal server error"
//  */


router.put(
    '/permis',
    authenticateUser,
    checkAndTakeActionOnPermission,
    updatePermission
  );


// /**
//  * @swagger
//   /permissions/delete:
//  *   delete:
//  *     tags:
//  *       - Permissions API
//  *     summary: Delete an existing permission
//  *     description: Deletes an existing permission after authenticating the user and verifying required conditions.
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: string
//  *                 description: The unique identifier of the permission to delete.
//  *                 example: "12345"
//  *     responses:
//  *       200:
//  *         description: Permission deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Permission deleted successfully"
//  *       400:
//  *         description: Bad request, validation failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Validation failed"
//  *       401:
//  *         description: Unauthorized, authentication failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Authentication failed"
//  *       403:
//  *         description: Forbidden, permission denied
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Permission denied"
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Internal server error"
//  */

  router.delete(
    '/permis',
    authenticateUser,
    checkAndTakeActionOnPermission,
    deletePermission
  );



export default router;