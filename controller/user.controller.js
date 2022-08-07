const userModel = require('../models/user.models')
const createOne = async (req, res) => {
    const { emailAddress, fullName, password, confirmPassword } = req.body
    console.log(req.body)
    const fields = {emailAddress, fullName, password, confirmPassword  }
    try {
      const newUser = await new userModel(fields)
      newUser.save() 
      return  res.send(newUser)
    
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server error')
    }
  }
  // const getSignupForm = (req, res) => {
  //   res.render('/signup')
  // }
  // const signup = async (req, res) => {
  //   try {
  //     const { emailAddress, fullName,password,confirmPassword } = req.body
      // hash the password
      // const passwordHash = await bcrypt.hash(password, config.get('hashing.salt'))
  //     const user = await User.create({
  //       emailAddress,
  //       fullName,
  //       password,
  //       confirmPassword
  //     })
  //     return res.render('redirects/layout', {
  //       message: 'Sign up successfully',
  //       renderLogin: true
  //     })
  //   } catch (error) {
  //     return res.render('redirects/layout', {
  //       message: 'Error while signup',
  //       error: true
  //     })
  //   }
  // }
  // const usersList = (req, res) => {
  //   res.render('user/layout')
  // }

  module.exports = createOne