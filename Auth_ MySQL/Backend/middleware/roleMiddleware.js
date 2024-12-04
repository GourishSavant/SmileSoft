export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    console.log('User role:', req.user?.role); // Log the user's role from the decoded token

    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden. You do not have access to this resource.' });
    }
    next(); // User has the correct role, so proceed
  };
};
