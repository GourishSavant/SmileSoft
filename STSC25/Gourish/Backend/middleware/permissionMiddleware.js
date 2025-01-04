import { getPermissionsByRoleModel } from '../models/userModel.js';

export const authorizePermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;
      const permissions = await getPermissionsByRoleModel(role);

      const hasPermission = permissions.some(
        (perm) => perm[requiredPermission] === 1
      );

      if (!hasPermission) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Failed to check permissions.' });
    }
  };
};
