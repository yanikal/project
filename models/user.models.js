const mongoose = require('mongoose')

// define schema
const schemaDefinition = {
  email: {
    type: String,
    required: [true, 'Email is required'],
    
  },
  fullname: {
    type: String,
    min: 3,
    max: 120
  },
  password: {
    type: String,
    require: [true, 'password is required']
  },
 confirmpassword: {
    type: String,
    require: [true, 'confirm password is required']
  }
  

  //{timestamp:true}
}

// create schema
const userSchema = new mongoose.Schema(schemaDefinition)

// model
const User = mongoose.model('user', userSchema)

module.exports = User