const express = require('express');
const router = express.Router();

// Import controllers
const {
  createStory,
  getAllStories,
  getStoryBySlug,
  getStoryById,
  updateStory,
  deleteStory
} = require('../controllers/story.controller');

// Import auth middleware
const protect = require('../middleware/auth.middleware');


// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// Get story by ID (for edit page)
router.get('/id/:id', protect, getStoryById);

// Create
router.post('/', protect, createStory);

// Update
router.put('/:id', protect, updateStory);

// Delete
router.delete('/:id', protect, deleteStory);


// ===============================
// PUBLIC ROUTES
// ===============================

// Get all published stories
router.get('/', getAllStories);

// Get story by slug
router.get('/:slug', getStoryBySlug);


module.exports = router;
