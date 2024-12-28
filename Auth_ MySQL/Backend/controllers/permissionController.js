

// // Fetch user permissions based on role_id
// exports.getUserPermissions = async (req, res) => {
//     try {
//         const { role_id } = req.user; // Assume user object is set by auth middleware

//         const [permissions] = await db.query(`
//             SELECT 
//                 pc.name AS permission_name,
//                 pc.short_code,
//                 rp.can_view,
//                 rp.can_add,
//                 rp.can_edit,
//                 rp.can_delete
//             FROM 
//                 roles_permissions rp
//             JOIN 
//                 permission_category pc ON rp.permission_category_id = pc.permission_category_id
//             WHERE 
//                 rp.role_id = ?
//         `, [role_id]);

//         res.status(200).json({ success: true, permissions });
//     } catch (error) {
//         console.error('Error fetching permissions:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch permissions' });
//     }
// };
// Get permissions for a role


// export const getPermissionsByRole = async (req, res) => {
//   const { role_id } = req.params;
//   console.log(" entered ")
//   try {
//     console.log("step 1")
//     const permissions = await UserModel.getPermissionsByRoleModel(role_id);
//     console.log("step 2")
//     res.status(200).json(permissions);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch permissions' });
//   }
// };

// export const updatePermissionsForRole = async (req, res) => {
//   const { role_id, permission_category_id, can_view, can_add, can_edit, can_delete } = req.body;

//   try {
//     // Call the function to update the permissions
//     const affectedRows = await UserModel.updatePermissionsForRole(role_id, permission_category_id, can_view, can_add, can_edit, can_delete);

//     if (affectedRows === 0) {
//       // If no rows were updated, return an error indicating that no record was found to update
//       return res.status(404).json({ error: 'No matching permissions found to update' });
//     }

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       role_id,
//       permission_category_id,
//       can_view,
//       can_add,
//       can_edit,
//       can_delete
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error);
//     res.status(500).json({ error: 'Failed to update permissions for role' });
//   }
// };

import * as UserModel from '../models/userModel.js';
export const getPermissionsByRole = async (req, res) => {
  const { role_id } = req.params;
  try {
    console.log("Fetching permissions...");
    const permissions = await UserModel.getPermissionsByRoleModel(role_id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

// Bulk Update Permissions for Role
export const bulkUpdatePermissionsForRole = async (req, res) => {
  const { role_id } = req.params;
  const { permissions } = req.body; // Expecting an array of permissions

  if (!permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
  }

  try {
    const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissions);

    res.status(200).json({
      message: 'Permissions updated successfully',
      affectedRows,
      role_id,
      permissions
    });
  } catch (error) {
    console.error('Error updating permissions:', error.message);
    res.status(500).json({ error: 'Failed to bulk update permissions for role' });
  }
};

// models/userModel.js
