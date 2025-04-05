const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: false // still allow standalone lessons
  },
  content: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // models/Lesson.js


}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
