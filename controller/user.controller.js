const User = require('../models/user.models')
const userModel = require('../models/user.models')
//const { email, fullname, password, confirmpassword} = req.body
const createOne = async (req, res) => {
    const { email, fullname, password, confirmpassword} = req.body
    console.log(req.body)
    const fields = {email, fullname, password, confirmpassword }
    try {
      const newUser = await new userModel(fields)
      newUser.save() 
      return  res.send(newUser)
    
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server error')
    }
  }

  
  module.exports = createOne

  