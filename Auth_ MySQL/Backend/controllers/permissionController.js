import * as UserModel from '../models/userModel.js';

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
export const getPermissionsByRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const permissions = await UserModel.getPermissionsByRole(roleId);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};