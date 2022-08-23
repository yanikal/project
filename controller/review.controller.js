const  toDoModel  = require('../models/review.model')

const getToDo = (req, res) => {
  res.send('to do get')
}

const getToDos = async (req, res) => {
  try {
    const toDoList = await toDoModel.find().exec()
    res.send(toDoList)
    return
  } catch (err) 
  { console.log(err)
    res.status(500).send(err)
  }
}

const createToDo = async (req, res) => {
  try {
    // throw new Error('some error')
    const { toDo, isCompleted } = req.body
    const newToDo = await toDoModel.create({ toDo, isCompleted })
   
    res.send(newToDo)
    
    return
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const updateToDo = async (req, res) => {
  try {
    const { _id } = req.params
    const { toDo, isCompleted } = req.body
    if (!_id) res.status(404).send('Not Found')

    await toDoModel.updateOne({ _id }, { toDo, isCompleted }).exec()
    const updatedToDo = await toDoModel.findById(_id).exec()
    res.send(updatedToDo)
  } catch (err) {
    res.status(500).send('Server error')
  }
}

const deleteToDo = async (req, res) => {
  try {
    const { _id } = req.params
    if (!_id) res.status(404).send('Not Found')
    await toDoModel.findByIdAndDelete(_id).exec()
    res.send({ message: `toDo with id: ${_id} has been delete successfully` })
  } catch (err) {
    res.status(500).send('Server error')
  }
}

module.exports = { getToDo, getToDos, createToDo, updateToDo, deleteToDo }