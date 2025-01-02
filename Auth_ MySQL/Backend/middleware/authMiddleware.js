
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { getUserByEmail } from '../models/userModel.js';

export const authenticateToken = (req, res, next) => {
  let accesstoken = config.jwtSecret;
  // const token = config.jwtSecret;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    accesstoken = req.headers.authorization.split(' ')[1];  // Get token after 'Bearer '
  }

  if (!accesstoken) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); 
    req.user = decoded;  
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: 'Not authorized, token failed or expired' });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.user = decoded;
    next();
  });
};



export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    console.log("token")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    
    const user = await getUserByEmail(decoded.email);
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    req.user.role = user.role;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
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
