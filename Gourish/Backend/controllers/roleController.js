// import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import * as UserModel from '../models/userModel.js';
// // controllers/roleController.js
// const Role = require('../models/roleModel');

// Create a new Role

// Create a new Role
// export const createRole = async (req, res) => {
//     try {
//         const { name, is_active, is_system, is_admin } = req.body;

//         // // Validate required fields
//         // if (!role || is_active === undefined || is_system === undefined || is_admin === undefined) {
//         //     return res.status(400).json({ success: false, message: 'All fields are required' });
//         // }

//         // Create role in the database
//         const role_id = await UserModel.createRole(name, is_active, is_system, is_admin);

//         res.status(201).json({
//             success: true,
//             message: 'Role created successfully',
//             role_id
//         });
//     } catch (error) {
//         console.error('Role Creation Error:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to create role',
//             error: error.message
//         });
//     }

// }


// export const createRole = async (req, res) => {
//   try {
    
//     const { name, is_active, is_system, is_admin } = req.body;

//     // if (['super_admin'].includes(name.toLowerCase())) {
//     //   return res.status(403).json({ error: 'Cannot create a protected role' });
//     // }

//     // ✅ Basic Validation
//     if (!name || typeof name !== 'string' || name.trim().length < 3) {
//       return res.status(400).json({ success: false, message: 'Name must be a string with at least 3 characters' });
//     }
//     if (typeof is_active !== 'boolean') {
//       return res.status(400).json({ success: false, message: 'is_active must be a boolean value' });
//     }
//     if (typeof is_system !== 'boolean') {
//       return res.status(400).json({ success: false, message: 'is_system must be a boolean value' });
//     }
//     if (typeof is_admin !== 'boolean') {
//       return res.status(400).json({ success: false, message: 'is_admin must be a boolean value' });
//     }

//     // ✅ Create Role in Database
//     const role_id = await UserModel.createRole(name, is_active, is_system, is_admin);

//     // ✅ Success Response
//     res.status(201).json({
//       success: true,
//       message: 'Role created successfully',
//       role_id,
//     });
//   } catch (error) {
//     console.error('Role Creation Error:', error.message);
//     res.status(500).json({ success: false, message: 'Failed to create role', error: error.message });
//   }
// };

export const createRole = async (req, res) => {
  try {
    const { name, is_active=1, is_system=1, is_admin=0 } = req.body;
    if(name == "Admin"){
      is_admin = 1;
    }
    // if (['super_admin'].includes(name.toLowerCase())) {
    //   return res.status(403).json({ error: 'Cannot create a protected role' });
    // }
    // :white_check_mark: Basic Validation
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Name must be a string with at least 3 characters' });
    }
    // if (typeof is_active !== 'boolean') {
    //   return res.status(400).json({ success: false, message: 'is_active must be a boolean value' });
    // }
    // if (typeof is_system !== 'boolean') {
    //   return res.status(400).json({ success: false, message: 'is_system must be a boolean value' });
    // }
    // if (typeof is_admin !== 'boolean') {
    //   return res.status(400).json({ success: false, message: 'is_admin must be a boolean value' });
    // }
    // :white_check_mark: Create Role in Database
    const role_id = await UserModel.createRole(name, is_active, is_system, is_admin);
    // :white_check_mark: Success Response
    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      role_id,
    });
  } catch (error) {
    console.error('Role Creation Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create role', error: error.message });
  }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await UserModel.getAllRoles();
        console.log("this is message from getAll roles ")

        res.status(200).json({
            success: true,
            message: 'Roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        console.error('Error fetching roles:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch roles',
            error: error.message
        });
    }
};


export const getRoleById = async (req, res) => {
  try {
    const { role_id } = req.params; // Extract role_id from URL params

        console.log(" getAll roles ")

    const role = await UserModel.getRoleById(role_id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Role retrieved successfully',
      data: role,
    });
  } catch (error) {
    console.error('Error fetching role by ID:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch role',
      error: error.message,
    });
  }
};

// export const updateRole = async (req, res) => {


//   try {
//     const { role_id } = req.params; // Extract role_id from URL params
//     const {  name, is_active = 1, is_system = 1, is_admin = 0 } = req.body;

//     if (!role_id) {
//       return res.status(400).json({ error: 'Role ID is required' });
//     }

//     if (!name) {
//       return res.status(400).json({ error: 'Name is required' });
//     }

//     let updatedIsAdmin = is_admin;
//     if (name.toLowerCase() === 'admin') {
//       updatedIsAdmin = 1;
//     }

//     if (name.toLowerCase() === 'super admin') {
//       return res.status(403).json({ error: 'Edit of Super Admin role is not allowed' });
//     }

//     const updated = await UserModel.updateRole(role_id, name, is_active, is_system, updatedIsAdmin);

//     if (updated) {
//       return res.status(200).json({ success: true, message: 'Role updated successfully' });
//     } else {
//       return res.status(404).json({ error: 'Role not found or not updated' });
//     }
//   } catch (err) {
//     console.error('Role Update Error:', err);
//     res.status(500).json({ error: 'Role updation failed', details: err.message });
//   }
// };
// Delete Role by role_id
export const updateRole = async (req, res) => {
  try {
    const { role_id } = req.params; // Extract role_id from URL params
    const { name, is_active = 1, is_system = 1, is_admin = 0 } = req.body;
    if (!role_id) {
      return res.status(400).json({ error: 'Role ID is required' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    let updatedIsAdmin = is_admin;
    if (name.toLowerCase() === 'admin') {
      updatedIsAdmin = 1;
    }
    if (name.toLowerCase() === 'super admin') {
      return res.status(403).json({ error: 'Edit of Super Admin role is not allowed' });
    }
    const updated = await UserModel.updateRole(role_id, name, is_active, is_system, updatedIsAdmin);
    if (updated) {
      return res.status(200).json({ success: true, message: 'Role updated successfully' });
    } else {
      return res.status(404).json({ error: 'Role not found or not updated' });
    }
  } catch (err) {
    console.error('Role Update Error:', err);
    res.status(500).json({ error: 'Role updation failed', details: err.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params; // Extract role_id from URL params

    if (!role_id) {
      return res.status(400).json({ error: 'Role ID is required' });
    }

    // Prevent deletion of critical roles (you might need a separate query to check role_id for these)
    const protectedRoleIds = [1, 2, 3, 4, 5, 6]; // Example role IDs for 'admin', 'super admin', etc.

    if (protectedRoleIds.includes(Number(role_id))) {
      return res.status(403).json({ error: 'Deletion of protected roles is not allowed' });
    }

    const deleted = await UserModel.deleteRoleById(role_id);

    if (deleted) {
      return res.status(200).json({ success: true, message: `Role with ID '${role_id}' deleted successfully` });
    } else {
      return res.status(404).json({ error: `Role with ID '${role_id}' not found or already deleted` });
    }
  } catch (err) {
    console.error('Role Deletion Error:', err);
    res.status(500).json({ error: 'Role deletion failed', details: err.message });
  }
};

// controllers/userController.js

export const getAllRoles = async (req, res) => {
  console.log("------------------")
  try {
      const role = await UserModel.getAllRoles();
      console.log(role)

      if (role) {
          return res.json(role); // Return user data as JSON response
      } else {
          return res.status(404).json({ error: 'Roles not found' });
      }
  } catch (error) {
      console.error('Error fetching roles:', error);
      res.status(500).json({error: 'Error fetching roles', details: error.message});
  }
}



export const getRoleByName = async (req, res) => {
  try {
    const { name } = req.params; // Extract role_name from URL params

    console.log("Fetching role by name:", name);

    const role = await UserModel.getRoleByName(name);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Role retrieved successfully',
      data: role,
    });
  } catch (error) {
    console.error('Error fetching role by name:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch role',
      error: error.message,
    });
  }
};
