const mongoose = require('mongoose')

// define schema
const schemaDefinition = {
  emailAddress: {
    type: String,
    required: [true, 'Email is required'],
    
  },
  fullName: {
    type: String,
    min: 3,
    max: 120
  },
  password: {
    type: String,
    require: [true, 'password is required']
  },
 confirmPassword: {
    type: String,
    require: [true, 'confirm password is required']
  }
}

// create schema
const userSchema = new mongoose.Schema(schemaDefinition)

// model
const User = mongoose.model('user', userSchema)

module.exports = User