const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')

// 密码加密
const encryptPassword = (text) => bcrypt.hashSync(text, 10)

// 密码校验
const comparePassword = (exist, incoming) => bcrypt.compareSync(incoming, exist)

const Users = new Schema({
  username: { type: String },
  password: { type: String },
  token: { type: String }
})

Users.pre('save', async function (next) {
  this.password = await encryptPassword(this.password)
  next()
})

// User.set('validateBeforeSave', true)
// User.path('password').validate(function (value) {
//   console.log('value', value)
// })

Users.methods.comparePassword = async function (exist, incoming) {
  const isMatch = await comparePassword(exist, incoming)
  return isMatch
}

module.exports = Users
