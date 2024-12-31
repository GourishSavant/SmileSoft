// middleware/authenticate.js

import jwt from 'jsonwebtoken';

// import { UserModel } from '../models/userModel.js';

// Authentication middleware to verify JWT
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

// Authorization middleware to check if the user is a superAdmin or Admin
export const authorize = (roles = [1, 2]) => {
  return (req, res, next) => {
    const userRole = req.user.role_id; // Assuming the decoded token has a 'role' field

    console.log(userRole);
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action' });
    }
    next();
  };
};

