// Import Admin model
const Admin = require('../models/Admin');

// Import JWT for token generation
const jwt = require('jsonwebtoken');


// ===============================
// ADMIN LOGIN CONTROLLER
// ===============================
const adminLogin = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    // If admin not found
    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Compare entered password with stored hashed password
    const isPasswordMatch = await admin.matchPassword(password);

    // If password does not match
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    // Send success response
    res.status(200).json({
      message: 'Admin logged in successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      message: 'Server error during login'
    });
  }
};



// ===============================

    



// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  adminLogin
 
};