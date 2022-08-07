// const userModel = require('../models/user.models')
// const createOne = async (req, res) => {
//     const { emailAddress, fullName, password, confirmPassword } = req.body
//     console.log(req.body)
//     const fields = {emailAddress, fullName, password, confirmPassword  }
//     try {
//       const newUser = await new userModel(fields)
//       newUser.save() 
//       return  res.send(newUser)
    
//     } catch (error) {
//       console.log(error.message)
//       res.status(500).send('Server error')
//     }
//   }

//   module.exports = createOne