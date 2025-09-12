// routes/tasks.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// @route GET /api/tasks
router.get('/', auth, taskController.getTasks);

// @route POST /api/tasks
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').notEmpty().trim(),
    check('title', 'Title must be at least 1 character').isLength({ min: 1 })
  ],
  taskController.createTask
);

// @route GET /api/tasks/:id
router.get('/:id', auth, taskController.getTaskById);

// @route PUT /api/tasks/:id
router.put(
  '/:id',
  [
    auth,
    check('title', 'Title cannot be empty').optional().notEmpty().trim()
  ],
  taskController.updateTask
);

// @route DELETE /api/tasks/:id
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
