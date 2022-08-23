const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: [true, 'to do text is required'],
    min: 5,
    max: 512
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo
