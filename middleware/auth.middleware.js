// Import jwt to verify token
const jwt = require('jsonwebtoken');

// Import Admin model
const Admin = require('../models/Admin');

// ===============================
// AUTH MIDDLEWARE
// ===============================
const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }

    // If token not found
    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, token missing'
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Find admin using decoded ID
    req.admin = await Admin.findById(decoded.id).select('-password');

    // If admin not found
    if (!req.admin) {
      return res.status(401).json({
        message: 'Admin not found'
      });
    }

    // 4️⃣ Check role
    if (req.admin.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    // All good → move to next middleware/controller
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      message: 'Not authorized, invalid token'
    });
  }
};

module.exports = protect;