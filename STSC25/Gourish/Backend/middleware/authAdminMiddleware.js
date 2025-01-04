// middleware/authorizeRole.js

export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check if req.user exists and has a role property
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        error: 'Unauthorized: No user information found. Please ensure you are logged in.'
      });
    }

    const userRole = req.user.role; // Extract role from user object

    console.log('Allowed Roles:', allowedRoles);
    console.log('User Role:', userRole);

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      error: 'Access denied: Insufficient role privileges.'
    });
  };
};
