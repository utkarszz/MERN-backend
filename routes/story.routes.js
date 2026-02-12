const express = require('express');
const router = express.Router();

// Import controllers
const {
  createStory,
  getAllStories,
  getStoryBySlug,
  updateStory,
  deleteStory
} = require('../controllers/story.controller');

// Import auth middleware
const protect = require('../middleware/auth.middleware');

// PUBLIC ROUTES
router.get('/', getAllStories); //Get all stories
router.get('/:slug', getStoryBySlug); //Get story by slug

// PROTECTED ROUTES (ADMIN ONLY)
router.post('/', protect, createStory); //Create a new story
router.put('/:id', protect, updateStory); //Update a story
router.delete('/:id', protect, deleteStory); //Delete a story
module.exports = router;