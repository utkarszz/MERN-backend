const Story = require('../models/Story');


// ===============================
// CREATE STORY (ADMIN ONLY)
// ===============================
const createStory = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message: 'Title, content and category are required'
      });
    }

    const story = await Story.create({
      title,
      content,
      category,
      status
    });

    res.status(201).json({
      message: 'Story created successfully',
      story
    });

  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({
      message: 'Server error while creating story'
    });
  }
};


// ===============================
// GET ALL PUBLISHED STORIES
// ===============================
const getAllStories = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = { status: 'published' };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const stories = await Story.find(query).sort({ createdAt: -1 });

    res.status(200).json(stories);

  } catch (error) {
    console.error('Fetch stories error:', error);
    res.status(500).json({
      message: 'Server error while fetching stories'
    });
  }
};


// ===============================
// GET STORY BY SLUG (PUBLIC)
// ===============================
const getStoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({
      slug,
      status: 'published'
    });

    if (!story) {
      return res.status(404).json({
        message: 'Story not found'
      });
    }

    story.views += 1;
    await story.save();

    res.status(200).json(story);

  } catch (error) {
    console.error('Single story error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// ===============================
// GET STORY BY ID (ADMIN)
// ===============================
const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: 'Story not found'
      });
    }

    res.status(200).json(story);

  } catch (error) {
    console.error('Get story by ID error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// ===============================
// UPDATE STORY (ADMIN)
// ===============================
const updateStory = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({
        message: 'Story not found'
      });
    }

    res.status(200).json({
      message: 'Story updated successfully',
      updatedStory
    });

  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// ===============================
// DELETE STORY (ADMIN)
// ===============================
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: 'Story not found'
      });
    }

    res.status(200).json({
      message: 'Story deleted permanently'
    });

  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};


module.exports = {
  createStory,
  getAllStories,
  getStoryBySlug,
  getStoryById,
  updateStory,
  deleteStory
};
