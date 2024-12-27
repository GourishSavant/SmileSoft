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
