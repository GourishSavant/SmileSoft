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
// import { authenticateUser } from '../middleware/authMiddleware.js';
// import { authorizePermission } from '../middlewares/permissionMiddleware.js';
import { bulkUpdatePermissionsForRoleById } from '../controllers/permissionController.js';

const router = express.Router();

// ✅ Get Permissions (Accessible only to authorized users)
// router.get(
//   '/permissions/:role_id',
//   authenticateUser,
//   authorizePermission('can_view'),
//   getPermissionsByRole
// );

// router.put('/roles/:role_id/permissions', bulkUpdatePermissionsForRoleById);


export default router;