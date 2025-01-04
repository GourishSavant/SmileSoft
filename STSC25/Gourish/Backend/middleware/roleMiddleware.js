export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    console.log('User role:', req.user?.role); // Log the user's role from the decoded token

    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden. You do not have access to this resource.' });
    }
    next(); // User has the correct role, so proceed
  };
};


export const authorizeRoles = (roles = ['Admin']) => {
  return (req, res, next) => {
    const userRole = req.user.role_id;  // Extract the role ID from the decoded token

    console.log("User Role:", userRole); // Debugging line

    // Check if the user role is allowed in the roles array
    if (roles.includes('Admin') && userRole !== 1) {
      return res.status(403).json({ error: 'Access denied. You must be a superAdmin to perform this action' });
    }

    next();
  };
};