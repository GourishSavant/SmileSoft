import * as UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// export const checkPermissionForSingleFeature = async (req, res) => {
//     const { role_id } = req.params;
//     const { feature } = req.body; // Single feature object to check permission for
  
//     console.log(feature)
//     if (!feature || typeof feature !== 'object') {
//       return res.status(400).json({ error: 'Invalid request format. Expected a feature object.' });
//     }
  
//     const { permission_category_id, can_create } = feature; // Extracting name and permission(s) (e.g., can_create)
  
//     if (!permission_category_id || can_create === undefined) {
//       return res.status(400).json({ error: 'Feature name and permission (e.g., can_create) must be provided.' });
//     }
  
//     try {
//       // Validate if the role exists
//       const roleExists = await UserModel.checkRoleExistsById(role_id);
//       console.log(roleExists)
//       if (!roleExists) {
//         return res.status(404).json({ error: 'Role not found with the given ID.' });
//       }
  
//     //   // Get permission category ID for the feature
//     //   const permission_category_id = await UserModel.getPermissionCategoryIdByName(name);
//     //   if (!permission_category_id) {
//     //     return res.status(404).json({ error: `Permission category '${name}' not found.` });
//     //   }
  
//       // Check if the role has the specified permission (e.g., create)
//       const canCreatePermission = await UserModel.checkCreatePermissionForRole(role_id, permission_category_id);
  
//       if (can_create && !canCreatePermission) {
//         return res.status(403).json({ error: `Role does not have create permission for '${permission_category_id}'` });
//       }
  
//       // If permission check passed
//       res.status(200).json({
//         message: `Permission checked successfully for '${permission_category_id}'`,
//         role_id,
//         feature: {
//           permission_category_id,
//           can_create: can_create,
//           has_permission: canCreatePermission,
//         },
//       });
  
//     } catch (error) {
//       console.error('Error checking permission:', error.message);
//       return res.status(500).json({ error: 'Failed to check permission for the feature.' });
//     }
//   };

export const checkAndTakeActionOnPermission =  async (req, res, next) => {
    console.log(req.user.role_id)
    const role_id  = req.user.role_id; // Extract role_id from the route
    const { feature } = req.body;   // Extract feature and permissions from the body
    
    console.log("====================")
    if (!feature || typeof feature !== 'object') {
      return res.status(400).json({ error: 'Invalid request format. Expected a feature object.' });
    }
  
    const { permission_category_id, can_create, can_edit, can_delete } = feature; // Destructure feature properties
  //  craete view 
    if (!permission_category_id) {
      return res.status(400).json({ error: 'Feature name is required.' });
    }
  
    try {
      // Validate if the role exists
      const roleExists = await UserModel.checkRoleExistsById(role_id);
      if (!roleExists) {
        return res.status(404).json({ error: 'Role not found with the given ID.' });
      }
  
      // Get the permission category ID dynamically by feature name
    //   const permission_category_id = await UserModel.getPermissionCategoryIdByName(name);
    //   if (!permission_category_id) {
    //     return res.status(404).json({ error: `Permission category '${name}' not found.` });
    //   }
  
      // Check and take actions based on the permissions dynamically
      const permissions = [];
  
      if (can_create !== undefined) {
        const canCreatePermission = await UserModel.checkCreatePermissionForRole(role_id, permission_category_id);
        console.log("cancretepr")
        console.log(canCreatePermission)
        if (can_create && !canCreatePermission) {
          return res.status(403).json({ error: `Role does not have create permission for '${permission_category_id}'` });

        }
        permissions.push({ action: 'create', allowed: can_create, has_permission: canCreatePermission });
      }
  
      if (can_edit !== undefined) {
        const canEditPermission = await UserModel.checkEditPermissionForRole(role_id, permission_category_id);
        if (can_edit && !canEditPermission) {
          return res.status(403).json({ error: `Role does not have edit permission for '${permission_category_id}'` });
        }
        permissions.push({ action: 'edit', allowed: can_edit, has_permission: canEditPermission });
      }
  
      if (can_delete !== undefined) {
        const canDeletePermission = await UserModel.checkDeletePermissionForRole(role_id, permission_category_id);
        if (can_delete && !canDeletePermission) {
          return res.status(403).json({ error: `Role does not have delete permission for '${permission_category_id}'` });
        }
        permissions.push({ action: 'delete', allowed: can_delete, has_permission: canDeletePermission });
      }
  
      // Return success message
    //   res.status(200).json({
    //     message: `Permissions checked and actions taken successfully for '${permission_category_id}'`,
    //     role_id,
    //     feature: {
    //       permission_category_id,
    //       permissions: permissions,
    //     },
    //   });
         next();
    } catch (error) {
      console.error('Error while checking permission:', error.message);
      return res.status(500).json({ error: 'Internal server error occurred while checking permission category.' });
    }
  };

  export const checkCreatePermissionForRole = async (req, res, next) => {
    console.log(req.user.role_id);
    const role_id = req.user.role_id; // Extract role_id from the user
  
    console.log("====================");
  
    try {
        // Validate if the role exists
        const roleExists = await UserModel.checkRoleExistsById(role_id);
        if (!roleExists) {
            return res.status(404).json({ error: 'Role not found with the given ID.' });
        }
  
        // Check and validate permissions dynamically
        const permissions = [];
  
        const canCreatePermission = await UserModel.checkRoleCreatePermission(role_id);
        console.log("yuok")
        console.log(canCreatePermission)
        if (!canCreatePermission) {
          return res.status(403).json({ error: `Role does not have create permission for '${role_id}'` });

        }
        permissions.push({ action: 'create', has_permission: canCreatePermission });
  
        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error while checking permission:', error.message);
        return res.status(500).json({ error: 'Internal server error occurred while checking permissions.' });
    }
  };


export const checkEditPermissionForRole = async (req, res, next) => {
  console.log(req.user.role_id);
  const role_id = req.user.role_id; // Extract role_id from the user

  console.log("====================");

  try {
      // Validate if the role exists
      const roleExists = await UserModel.checkRoleExistsById(role_id);
      if (!roleExists) {
          return res.status(404).json({ error: 'Role not found with the given ID.' });
      }

      // Check and validate permissions dynamically
      const permissions = [];

          const canEditPermission = await UserModel.checkRoleEditPermission(role_id);
          if (!canEditPermission) {
              return res.status(403).json({ error: `Role does not have edit permission for '${role_id}'` });
          }
          permissions.push({ action: 'edit', has_permission: canEditPermission });

      // Proceed to the next middleware
      next();
  } catch (error) {
      console.error('Error while checking permission:', error.message);
      return res.status(500).json({ error: 'Internal server error occurred while checking permissions.' });
  }
};

export const checkDeletePermissionForRole = async (req, res, next) => {
  console.log(req.user.role_id);
  const role_id = req.user.role_id; // Extract role_id from the user

  console.log("====================");

  try {
      // Validate if the role exists
      const roleExists = await UserModel.checkRoleExistsById(role_id);
      if (!roleExists) {
          return res.status(404).json({ error: 'Role not found with the given ID.' });
      }

      // Check and validate permissions dynamically
      const permissions = [];

  
          const canDeletePermission = await UserModel.checkRoleDeletePermission(role_id);
          if ( !canDeletePermission) {
              return res.status(403).json({ error: `Role does not have delete permission for '${role_id}'` });
          }
          permissions.push({ action: 'delete', has_permission: canDeletePermission });
    

      // Proceed to the next middleware
      next();
  } catch (error) {
      console.error('Error while checking permission:', error.message);
      return res.status(500).json({ error: 'Internal server error occurred while checking permissions.' });
  }
};



export const checkviewPermissionForRole = async (req, res, next) => {
  console.log(req.user.role_id);
  const role_id = req.user.role_id; // Extract role_id from the user

  console.log("====================");

  try {
      // Validate if the role exists
      const roleExists = await UserModel.checkRoleExistsById(role_id);
      if (!roleExists) {
          return res.status(404).json({ error: 'Role not found with the given ID.' });
      }

      // Check and validate permissions dynamically
      const permissions = [];

  
          const canViewPermission = await UserModel.checkRoleViewPermission(role_id);
          if ( !canViewPermission) {
              return res.status(403).json({ error: `Role does not have delete permission for '${role_id}'` });
          }
          permissions.push({ action: 'delete', has_permission: canViewPermission });
    

      // Proceed to the next middleware
      next();
  } catch (error) {
      console.error('Error while checking permission:', error.message);
      return res.status(500).json({ error: 'Internal server error occurred while checking permissions.' });
  }
};

  
  