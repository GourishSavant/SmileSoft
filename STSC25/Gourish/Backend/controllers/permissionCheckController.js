import * as UserModel from '../models/userModel.js';

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

// export const checkAndTakeActionOnPermission = async (req, res) => {
//     const { role_id } = req.params; // Extract role_id from the route
//     const { feature } = req.body;   // Extract feature and permissions from the body
  
//     if (!feature || typeof feature !== 'object') {
//       return res.status(400).json({ error: 'Invalid request format. Expected a feature object.' });
//     }
  
//     const { permission_category_id, can_create, can_edit, can_delete } = feature; // Destructure feature properties
  
//     if (!permission_category_id) {
//       return res.status(400).json({ error: 'Feature name is required.' });
//     }
  
//     try {
//       // Validate if the role exists
//       const roleExists = await UserModel.checkRoleExistsById(role_id);
//       if (!roleExists) {
//         return res.status(404).json({ error: 'Role not found with the given ID.' });
//       }
  
//       // Get the permission category ID dynamically by feature name
//     //   const permission_category_id = await UserModel.getPermissionCategoryIdByName(name);
//     //   if (!permission_category_id) {
//     //     return res.status(404).json({ error: `Permission category '${name}' not found.` });
//     //   }
  
//       // Check and take actions based on the permissions dynamically
//       const permissions = [];
  
//       if (can_create !== undefined) {
//         const canCreatePermission = await UserModel.checkCreatePermissionForRole(role_id, permission_category_id);
//         if (can_create && !canCreatePermission) {
//           return res.status(403).json({ error: `Role does not have create permission for '${permission_category_id}'` });

//         }
//         permissions.push({ action: 'create', allowed: can_create, has_permission: canCreatePermission });
//       }
  
//       if (can_edit !== undefined) {
//         const canEditPermission = await UserModel.checkEditPermissionForRole(role_id, permission_category_id);
//         if (can_edit && !canEditPermission) {
//           return res.status(403).json({ error: `Role does not have edit permission for '${permission_category_id}'` });
//         }
//         permissions.push({ action: 'edit', allowed: can_edit, has_permission: canEditPermission });
//       }
  
//       if (can_delete !== undefined) {
//         const canDeletePermission = await UserModel.checkDeletePermissionForRole(role_id, permission_category_id);
//         if (can_delete && !canDeletePermission) {
//           return res.status(403).json({ error: `Role does not have delete permission for '${permission_category_id}'` });
//         }
//         permissions.push({ action: 'delete', allowed: can_delete, has_permission: canDeletePermission });
//       }
  
//       // Return success message
//       res.status(200).json({
//         message: `Permissions checked and actions taken successfully for '${permission_category_id}'`,
//         role_id,
//         feature: {
//           permission_category_id,
//           permissions: permissions,
//         },
//       });
  
//     } catch (error) {
//       console.error('Error while checking permission:', error.message);
//       return res.status(500).json({ error: 'Internal server error occurred while checking permission category.' });
//     }
//   };
  
export const createPermission = async (req, res) => {
    const { feature } = req.body;   // Extract feature and permissions from the body
    try{

    
    let data;
    switch(feature.permission_category_id)
    {
        case 1:
            try {
                // Extract data from req.body
                // Fetch data from incoming payload
                // Call the admission_enquiry function with dynamic payload data
                const data = await UserModel.admission_enquiry(feature);
        
                res.status(201).json({
                    message: 'Admission enquiry successfully created!',
                    enquiryId: data,
                });
            } catch (error) {
                console.error('Failed to process admission enquiry:', error.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 2:


    }
    console.log("Hello  How are you!!")
    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
    return res.json(data); 
    // res.status(200).json({
    //         message: `Permissions checked and actions taken successfully for `,
            
    //       });
    }catch (error) {
        console.error('Error fetching feature data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }

};


export const deletePermission = async (req, res) => {
    const { feature } = req.body;   // Extract feature and permissions from the body
    try{

    
    let data;
    switch(feature.permission_category_id)
    {
        case 1:
            data = await UserModel.getAllRoles();
            break;

    }
    console.log("Hello  How are you!!")
    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
    return res.json(data); 
    // res.status(200).json({
    //         message: `Permissions checked and actions taken successfully for `,
            
    //       });
    }catch (error) {
        console.error('Error fetching feature data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }

};

export const updatePermission = async (req, res) => {
    const { feature } = req.body;   // Extract feature and permissions from the body
    try{

    
    let data;
    switch(feature.permission_category_id)
    {
        case 1:
         try {
                // Extract data from req.body
                // Fetch data from incoming payload
                // Call the admission_enquiry function with dynamic payload data
                const data = await UserModel.updateAdmissionEnquiry(feature.enquiry_id,feature);
        
                res.status(201).json({
                    message: 'Admission enquiry successfully created!',
                    enquiryId: data,
                });
            } catch (error) {
                console.error('Failed to process admission enquiry:', error.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;


    }
    console.log("Hello Update!!")
    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
    return res.json(data); 
    // res.status(200).json({
    //         message: `Permissions checked and actions taken successfully for `,
            
    //       });
    }catch (error) {
        console.error('Error fetching feature data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }

};