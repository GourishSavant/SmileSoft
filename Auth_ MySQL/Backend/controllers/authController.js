import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import cookieParser from 'cookie-parser';
import * as UserModel from '../models/userModel.js';
const jwtSecret = config.jwtSecret;
// dotenv.config() 
// Register User
export const registerUser = async (req, res) => {
    const { role, fullName, email, password } = req.body;
     // Log the incoming request body for debugging
     console.log('Received Data:', req.body);
// Check for missing fields
if (!role || !fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Debugging: Log hashed password
    const registerId = await UserModel.createUser(role, fullName, email, hashedPassword);
    console.log('Register ID:', registerId); // Debugging: Log user ID returned from createUser
    res.status(201).json({ message: 'User registered successfully', registerId });
  } catch (error) {
    console.error('Registration Error:', error); // Debugging: Log registration error
    res.status(500).json({ error: 'User registration failed', details: error.message });
  }
};
// Login User
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     // Log the incoming request body for debugging
//     console.log('Login Data:', req.body);
//     // Check for missing fields
//     if (!email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
//     try {
//       const user = await UserModel.getUserByEmail(email);
//       console.log('User Found:', user); // Debugging: Log user data
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       console.log('Password Valid:', isPasswordValid); // Debugging: Log password validation result
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }
//       if(user.role === 'Admin')
//       {
//         console.log('Welcome Admin !!!');
//       }
//       else if(user.role === 'Super Admin')
//       {
//         console.log('Welcome Super Admin !!!');
//       }
//       else if(user.role === 'Student')
//         {
//           console.log('Welcome Student !!!');
//         }
//       else
//       {
//         console.log('Welcome Teacher !!!');
//       }
//       const token = jwt.sign({ registerId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
//       console.log('JWT Token:', token); // Debugging: Log JWT token
//       res.status(200).json({ message: 'Login successful', token, user });
//   }
//   catch (error) {
//     console.error('Login Error:', error); // Debugging: Log login error
//     res.status(500).json({ error: 'Login failed', details: error.message });
//   }
// };

// login User changes for [protected roles ]
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   // Check for missing fields
//   if (!email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const user = await UserModel.getUserByEmail(email);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate JWT token
//     // const token = jwt.sign({ registerId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
//     // In the login controller, use process.env.JWT_SECRET to sign the token:
//     const token = jwt.sign({ registerId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


//     // Send response with token and user data
//     res.status(200).json({ message: 'Login successful', token, user });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed', details: error.message });
//   }
// };

// login user for refresh token 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate token with the correct role
    // const token = jwt.sign({ registerId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
   
    // const token = jwt.sign({ registerId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // / Create Access and Refresh Tokens
      const accesstoken = jwt.sign({ registerId: user.registerId, role: user.role }, jwtSecret, { expiresIn: '15m' }); // Short expiry for access token
      console.log(" data is fetching from user login token   ",user.role);
      console.log("reister")
      const refreshToken = jwt.sign(
        { registerId: user.registerId, role: user.role }, 
        jwtSecret,
         { expiresIn: '7d' }); // Longer expiry for refresh token
      
        // Set tokens in cookies
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,  // Make sure 'secure' is set to true in production environments with HTTPS
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        });

    res.status(200).json({ message: 'Login successful', accesstoken, user });

  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

export const logoutUser = async (req, res) => {

  try{
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    });
    res.status(200).json({ message: 'Logout successful'});
  }
  catch (error) {
    res.status(500).json({ error: 'Logout failed', details: error.message });
  }
}




// export const refreshToken = async (req, res) => {
//   const refreshToken = req.refreshToken; // Get the refresh token from the cookie (or from headers)

//   if (!refreshToken) {
//     return res.status(401).json({ error: 'No refresh token, authorization denied' });
//   }

//   try {
//     // Verify the refresh token
//     jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ error: 'Invalid or expired refresh token' });
//       }

//       // Token is valid, create a new access token
//       const user = await UserModel.getUserById(decoded.registerId); // Retrieve user info using decoded registerId

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Create new access token
//       const newAccessToken = jwt.sign(
//         { registerId: user.id, role: user.role },
//         jwtSecret,
//         { expiresIn: '15m' } // Set expiration for access token
//       );

//       res.status(200).json({
//         message: 'Access token refreshed successfully',
//         accessToken: newAccessToken,
//       });
//     });
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     res.status(500).json({ error: 'Error refreshing token' });
//   }
// };
export const refreshToken = async (req, res) => {
  // Log the request to see if cookies are being set
  console.log('Cookies:', req.cookies); // Check if refreshToken is present
  console.log('Request Body:', req.body); // Check if refreshToken is in the body

  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token, authorization denied' });
  }

  try {
    // Verify the refresh token
    jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
      if (err) {
        console.error('JWT Verify Error:', err);  // Log the error
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }

      // Log decoded object to see if registerId exists
      console.log('Decoded JWT:', decoded);

      if (!decoded || !decoded.registerId) {
        return res.status(400).json({ error: 'Invalid token data' });
      }

      // Proceed with retrieving the user data
      // const user = await UserModel.getUserById(decoded.registerId);
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }

      // Create new access token
      const newAccessToken = jwt.sign(
        { registerId: user.id, role: user.role },
        jwtSecret,
        { expiresIn: '15m' } // Set expiration for access token
      );

      res.status(200).json({
        message: 'Access token refreshed successfully',
        accessToken: newAccessToken,
      });
    });

  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Error refreshing token' });
  }
};




export const getUser = async (req, res) => {
  const email = req.query.email || req.body.email;
  if (!email) {
      return res.status(400).json({ error: 'Email is required' });
  }
  try {
      const user = await UserModel.getUserByEmail(email);
      if (user) {
          return res.json(user); // Return user data as JSON response
      } else {
          return res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Error fetching user data' });
  }
};

// // -------------------------------------------
// export const staffLogin = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate Input
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     // Fetch staff details by email
//     const staff = await UserModel.getStaffByEmail(email);

//     if (!staff) {
//       return res.status(404).json({ error: 'Staff not found' });
//     }

//     // Validate password
//     // const isPasswordValid = await bcrypt.compare(password, staff.password);
//     // if (!isPasswordValid) {
//     //   return res.status(401).json({ error: 'Invalid password' });
//     // }

//     // Generate Access and Refresh Tokens
//     const accessToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id,email:staff.email },
//       jwtSecret,
//       { expiresIn: '15m' }
//     );

//     const refreshToken = jwt.sign(
//       { staff_id: staff.staff_id, role_id: staff.role_id },
//       jwtSecret,
//       { expiresIn: '7d' }
//     );

//     // Set Refresh Token in Cookie
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Return response
//     res.status(200).json({
//       message: 'Login successful',
//       accessToken,
//       staff: {
//         staff_id: staff.staff_id,
//         email: staff.email,
//         role_id: staff.role_id,
//         first_name: staff.first_name,
//         last_name: staff.last_name,
//       },
//     });
//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ error: 'Login failed', details: error.message });
//   }
// };
