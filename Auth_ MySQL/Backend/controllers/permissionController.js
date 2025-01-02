
import * as UserModel from '../models/userModel.js';

export const getPermissionsByRole = async (req, res) => {
  // const { role_id } = req.params;
  try {
    console.log("Fetching permissions...");
    const permissions = await UserModel.getPermissionsByRoleModel(1);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

// export const getAllPermissions = async (req, res) => {
//   try {
//     console.log("Fetching all permissions...");
//     const permissions = await UserModel.getAllPermissionsModel();
//     res.status(200).json({ permissions });
//   } catch (error) {
//     console.error('Error fetching all permissions:', error);
//     res.status(500).json({ error: 'Failed to fetch all permissions' });
//   }
// };

export const getAllPermissions = async (req, res) => {
  try {
    console.log("get all")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissions(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data: permissions 
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
export const getAllPermissionsById = async (req, res) => {
  const { role_id } = req.params;
  try {
    console.log("get all")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissionById(role_id); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data: permissions 
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
export const getStaffPermissions = async (req, res) => {
  try {
    console.log("get all")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissionById(req.user.role_id); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data: permissions 
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
// // Bulk Update Permissions for Role
// export const bulkUpdatePermissionsForRole = async (req, res) => {
//   const { role_id } = req.params;
//   const { permissions } = req.body; // Expecting an array of permissions

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissions);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       role_id,
//       permissions
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };

// // models/userModel.js


// Bulk Update Permissions for Role by Role Name and Category Name
// export const bulkUpdatePermissionsForRoleByNames = async (req, res) => {
//   const { name } = req.params;
//   const { permissions } = req.body; // Expecting an array of permission objects with category_name

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     // Fetch role_id by role_name
//     const role_id = await UserModel.getRoleIdByName(name);
//     if (!role_id) {
//       return res.status(404).json({ error: 'Role not found with the given name' });
//     }

//     // Map category names to their IDs
//     const permissionUpdates = [];
//     for (const permission of permissions) {
//       const permission_category_id = await UserModel.getPermissionCategoryIdByName(permission.name);
//       if (!permission_category_id) {
//         return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
//       }
//       permissionUpdates.push({
//         permission_category_id,
//         can_view: permission.can_view,
//         can_add: permission.can_add,
//         can_edit: permission.can_edit,
//         can_delete: permission.can_delete,
//       });
//     }

//     // Perform bulk update
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       name,
//       permissions: permissionUpdates,
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };

// [
  // authorizeRole([1, 2]),


  // ...............main code for....................
// export const bulkUpdatePermissionsForRoleById  =async (req, res) => {
//   const { role_id } = req.params;
//   const { permissions } = req.body; // Expecting an array of permission objects with category_name

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     // Validate if role_id exists
//     const roleExists = await UserModel.checkRoleExistsById(role_id);
//     if (!roleExists) {
//       return res.status(404).json({ error: 'Role not found with the given ID' });
//     }

//     // Map category names to their IDs
//     const permissionUpdates = [];
//     for (const permission of permissions) {
//       const permission_category_id = await UserModel.getPermissionCategoryIdByName(permission.name);
//       if (!permission_category_id) {
//         return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
//       }
//       permissionUpdates.push({
//         permission_category_id,
//         can_view: permission.can_view,
//         can_add: permission.can_add,
//         can_edit: permission.can_edit,
//         can_delete: permission.can_delete,
//       });
//     }

//     // Perform bulk update
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       role_id,
//       permissions: permissionUpdates,
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };
// .............................main code end .............................

export const bulkUpdatePermissionsForRoleById = async (req, res) => {
  const { role_id } = req.params;
  const { permissions } = req.body; // Expecting an array of permission objects with category_name

  if (!permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
  }

  try {
    // Validate if role_id exists
    const roleExists = await UserModel.checkRoleExistsById(role_id);
    if (!roleExists) {
      return res.status(404).json({ error: 'Role not found with the given ID' });
    }

    // Map category names to their IDs
    const permissionUpdates = [];
    for (const permission of permissions) {
      const permission_category_id = await UserModel.getPermissionCategoryIdByName(permission.name);
      if (!permission_category_id) {
        return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
      }
      permissionUpdates.push({
        permission_category_id,
        can_view: permission.can_view,
        can_add: permission.can_add,
        can_edit: permission.can_edit,
        can_delete: permission.can_delete,
      });
    }

    // Perform bulk update
    const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);

    res.status(200).json({
      message: 'Permissions updated successfully',
      affectedRows,
      role_id,
      permissions: permissionUpdates,
    });
  } catch (error) {
    console.error('Error updating permissions:', error.message);
    res.status(500).json({ error: 'Failed to bulk update permissions for role' });
  }
};

