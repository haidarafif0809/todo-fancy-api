const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text:  String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: Date,
  status:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo',todoSchema);
