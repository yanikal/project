const mongoose = require('mongoose')

const { DB_NAME } = process.env

uri ="mongodb://localhost:27017"

const connect = () => {
  mongoose.connect(uri).catch(err => {
    console.error(err)
  })

  mongoose.connection.on('open', () => {
    console.log('mongoose connected successfully')
  })
}

module.exports = {
  uri,
  connect
}