// const { Schema } = require('mongoose')
// const { Users } = require('../lib/mongodb')

// const responseHandler = (err = null, data = {}) => ({
//   err,
//   data
// })

// const findOne = (username) => {
//   return Users
//     .findOne({ username })
//     .exec((err, user) => responseHandler(err, user))
// }

// const insertOne = async (user) => {
//   const _user = await findOne(user.username)
//   if (!_user) { // 不存在user => insert one
//     return Users.create(user, (err, res) => {
//       return responseHandler(err, res)
//     })
//   }
//   // 存在user => return result
//   return responseHandler(true, '用户已存在')
// }

// const comparePassword = async (existPwd, incomingPwd) => {
//   const users = new Users()
//   return users.comparePassword(existPwd, incomingPwd)
// }

// module.exports = {
//   findOne,
//   insertOne,
//   comparePassword
// }
