const { Schema } = require('mongoose')

const signupSchema = new Schema({
  username: String,
  password: String,
  createTime: {
    type: Number,
    default: new Date().getTime()
  }
})

module.exports = {
  signupSchema
}

// const { Users } = require('../lib/mongodb')

// const comparePassword = async (existPwd, incomingPwd) => {
//   const users = new Users()
//   return users.comparePassword(existPwd, incomingPwd)
// }

// module.exports = {
//   findOne,
//   insertOne,
//   comparePassword
// }
