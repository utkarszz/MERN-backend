// Import mongoose
const mongoose = require('mongoose');

// Create schema for Story
const storySchema = new mongoose.Schema(
  {
    // Title of the story
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Content of the story
    content: {
      type: String,
      required: true
    },

    // Category for filtering
    category: {
      type: String,
      enum: ['Coding', 'Life', 'Lessons'],
      required: true
    },

    // Draft or published status
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },

    // Slug (auto-generated, NOT required manually)
    slug: {
      type: String,
      unique: true
    },

    // View count
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);


// ===============================
// Generate slug before saving
// ===============================
storySchema.pre('save', function () {

  if (!this.isModified('title')) return;

  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .join('-');

});


// Export model
module.exports = mongoose.model('Story', storySchema);