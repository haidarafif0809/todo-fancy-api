const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text:  String,
  user: {
    type: Schema.Types.ObjectId
    ref: 'User'
  },
  dueDate: Date,
  createdAt: Date.now
});

module.exports = mongoose.model('Todo',todoSchema);
