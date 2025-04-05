const Lesson = require('../models/Lesson');

// Create Lesson
exports.createLesson = async (req, res) => {
  const { title, content, videoLink } = req.body;

  try {
    const lesson = await Lesson.create({
      title,
      content,
      videoLink,
      createdBy: req.user.userId
    });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Error creating lesson', error: err.message });
  }
};

// Get All Lessons for User
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ createdBy: req.user.userId });
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lessons', error: err.message });
  }
};

// Get Single Lesson
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lesson', error: err.message });
  }
};

// Update Lesson
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!lesson) return res.status(404).json({ message: 'Lesson not found or not yours' });
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Error updating lesson', error: err.message });
  }
};

// Delete Lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found or not yours' });
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lesson', error: err.message });
  }
};
