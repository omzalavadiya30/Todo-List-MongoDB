const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' }
});

module.exports = mongoose.model('Todo', todoSchema);
