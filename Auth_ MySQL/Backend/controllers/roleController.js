
import * as UserModel from '../models/userModel.js';
// // controllers/roleController.js
// const Role = require('../models/roleModel');

// Create a new Role

// Create a new Role
export const createRole = async (req, res) => {
    try {
        const { name, is_active, is_system, is_admin } = req.body;

        // // Validate required fields
        // if (!role || is_active === undefined || is_system === undefined || is_admin === undefined) {
        //     return res.status(400).json({ success: false, message: 'All fields are required' });
        // }

        // Create role in the database
        const role_id = await UserModel.createRole(name, is_active, is_system, is_admin);

        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            role_id
        });
    } catch (error) {
        console.error('Role Creation Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create role',
            error: error.message
        });
    }

}

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

// /**
//  * @desc Get a Single Role by ID
//  * @route GET /api/roles/:id
//  */import { getRoleById } from '../models/RoleModel'; // Ensure the path is correct

// API Controller to fetch a single role by ID

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


// controllers/userController.js

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

// /**
//  * @desc Update a Role
//  * @route PUT /api/roles/:id
//  */
// export const updateRole = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, is_active, is_system, is_admin } = req.body;

//         const updatedRole = await UserModel.updateRole(id, name, is_active, is_system, is_admin);

//         if (!updatedRole) {
//             return res.status(404).json({ success: false, message: 'Role not found or not updated' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Role updated successfully',
//             data: updatedRole
//         });
//     } catch (error) {
//         console.error('Error updating role:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to update role',
//             error: error.message
//         });
//     }
// };

// /**
//  * @desc Delete a Role
//  * @route DELETE /api/roles/:id
//  */
// export const deleteRole = async (req, res) => {
//     try {
//         const { role_id } = req.params;

//         const deletedRole = await UserModel.deleteRole(role_id);

//         if (!deletedRole) {
//             return res.status(404).json({ success: false, message: 'Role not found or already deleted' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Role deleted successfully'
//         });
//     } catch (error) {
//         console.error('Error deleting role:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to delete role',
//             error: error.message
//         });
//     }
// };



// import Role from '../models/role.js'
// export const getAllRoles = async (req, res) => {
//   try {
//     const roles = await Role.findAll();
//     res.json(roles);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const createRole = async (req, res) => {
//   try {
//     const role = await Role.create(req.body);
//     res.status(201).json(role);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const updateRole = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Role.update(req.body, { where: { role_id: id } });
//     res.json({ message: 'Role updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const deleteRole = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Role.destroy({ where: { role_id: id } });
//     res.json({ message: 'Role deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
