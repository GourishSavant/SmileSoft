// middleware/authenticate.js

import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the Authorization header
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


/**
 * Middleware to authorize users based on multiple role IDs (1, 2, 3, 4, 5)
 * @param {Array<number>} roles - List of allowed role IDs
 */
export const authorizeStaff = (roles = [1, 2, 3, 4, 5]) => {
  return (req, res, next) => {
    try {
      // Ensure req.user exists and has role_id
      if (!req.user || !req.user.role_id) {
        return res.status(403).json({ error: 'Access denied. No role information found.' });
      }

      const userRole = req.user.role_id;
      console.log('User Role:', userRole);
      console.log('Allowed Roles:', roles);
      console.log('========================================');
     

      // Check if the user's role is in the allowed roles list
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          error: 'Access denied. You do not have permission to perform this action.',
        });
      }

      next(); // User is authorized, proceed to the next middleware/controller
    } catch (error) {
      console.error('Authorization Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error during authorization.' });
    }
  };
};


// export const authorize = (req, res, next) => {
  
      
//       const userRole = req.user.role_id; 
//       console.log("========================================")
//       console.log(userRole);
//       if (!roles.includes(userRole)) {
//         return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action' });
//       }
//       next();
//     };

// Authorization middleware to check if the user is a superAdmin or Admin
export const authorize = (roles = [1]) => {

  
  return (req, res, next) => {

    const userRole = req.user.role_id; 
    console.log("========================================")
    console.log(userRole);
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action' });
    }
    next();
  };
};
  