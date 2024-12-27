// routes/roleRoutes.js
import express from 'express';
import { createRole } from '../controllers/roleController.js'; // Use ES module import
import {getRoles} from '../controllers/roleController.js';
import {getRoleById} from '../controllers/roleController.js';
import {getPermissionsByRole} from '../controllers/permissionController.js';
import {assignPermission} from '../controllers/permissionController.js'
const router = express.Router();

// Role Routes
router.post('/roles', createRole);        // Create Role
router.get('/roles', getRoles);        
router.get('/roles/:role_id', getRoleById);
// router.put('/roles/:id', updateRole);     // Update Role
// router.delete('/roles/:id', deleteRole);  // Delete Role

router.get('/:role_id', getPermissionsByRole);
router.put('/assign_permission', assignPermission);

export default router;
