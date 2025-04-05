const express = require('express');
const router = express.Router();
const {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');

const authenticate = require('../middleware/authMiddleware');

// All routes below require JWT authentication
router.post('/', authenticate, createLesson);
router.get('/', authenticate, getLessons);
router.get('/:id', authenticate, getLesson);
router.put('/:id', authenticate, updateLesson);
router.delete('/:id', authenticate, deleteLesson);

module.exports = router;
