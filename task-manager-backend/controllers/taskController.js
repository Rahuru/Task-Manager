// controllers/taskController.js
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, dueDate } = req.body;
    
    const task = new Task({ 
      user: req.user.id, 
      title: title.trim(), 
      description: description ? description.trim() : '', 
      dueDate 
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Task not found' });
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, completed, dueDate } = req.body;
    
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title.trim();
    if (description !== undefined) updatedFields.description = description.trim();
    if (completed !== undefined) updatedFields.completed = completed;
    if (dueDate !== undefined) updatedFields.dueDate = dueDate;

    let task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Task not found' });
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Task not found' });
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Task not found' });
    res.status(500).json({ msg: 'Server error' });
  }
};
