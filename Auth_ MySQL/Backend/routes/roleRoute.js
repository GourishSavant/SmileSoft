// routes/roleRoutes.js
import express from 'express';
import { createRole } from '../controllers/roleController.js'; // Use ES module import
import {getRoles} from '../controllers/roleController.js';
import {getRoleByName} from '../controllers/roleController.js';
import {getPermissionsByRole} from '../controllers/permissionController.js';
// import {updatePermissionsForRole} from '../controllers/permissionController.js';
// import {assignPermission} from '../controllers/permissionController.js'
import {bulkUpdatePermissionsForRole} from '../controllers/permissionController.js';
const router = express.Router();

// Role Routes
router.post('/roles', createRole);        // Create Role
router.get('/roles', getRoles);        
router.get('/roles/name/:name', getRoleByName);
router.get('/role-permissions/:role_id', getPermissionsByRole);
// router.put('/roles/:id', updateRole);     // Update Role
// router.delete('/roles/:id', deleteRole);  // Delete Role

// router.post('/', addPermissionsToRole);
// router.put('/update-permission', updatePermissionsForRole);

router.put('/roles/:role_id/permissions', bulkUpdatePermissionsForRole);


export default router;
