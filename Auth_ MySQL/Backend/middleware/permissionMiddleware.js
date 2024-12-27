// // const RolePermission = require('../models/RolePermission');
// import RolePermission from "../models/rolepermission"
// module.exports.checkPermission = (permissionCategoryId, action) => {
//   return (req, res, next) => {
//     const roleId = req.user.role_id;

//     RolePermission.getPermissionsByRole(roleId, (err, results) => {
//       if (err) return res.status(500).send(err);

//       const permission = results.find(
//         (p) => p.permission_category_id === permissionCategoryId
//       );

//       if (!permission || !permission[action]) {
//         return res.status(403).send('Access Denied');
//       }

//       next();
//     });
//   };
// };
