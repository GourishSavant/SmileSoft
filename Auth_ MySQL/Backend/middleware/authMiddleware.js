
import jwt from 'jsonwebtoken';
import config from '../config.js';

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