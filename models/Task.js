const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
