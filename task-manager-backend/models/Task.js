// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
