// module.exports = {
//   username: { type: String },
//   password: { type: String },
//   token: { type: String }
// }

const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')

// 密码加密
const encryptPassword = (text) => bcrypt.hashSync(text, 10)

const User = new Schema({
  username: { type: String },
  password: { type: String },
  token: { type: String }
})

User.pre('save', async function (next) {
  this.password = await encryptPassword(this.password)
  next()
})

// User.method.comparePassword = (password, cb) => {
//   console.log('password', password)
//   console.log('this.password', this.password)

//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     if (err) {
//       console.log('err', err)
//       return err
//     }
//   })
// }

module.exports = User
