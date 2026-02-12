// Import express
const express = require('express');

// Create router instance
const router = express.Router();

// Import controllers
const {
  adminLogin,
  registerAdmin
} = require('../controllers/auth.controller');


// ===============================



// ===============================
// ADMIN LOGIN ROUTE
// ===============================
// POST /api/auth/login
router.post('/login', adminLogin);


// Export the router
module.exports = router;