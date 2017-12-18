const { User } = require('../lib/mongodb')

const findOne = () => {
  return User
    .find()
    .exec()
}

const insertOne = (user) => {
  return user
  // return User
  //   .insertOne(user)
  //   .exec()
}

module.exports = {
  findOne,
  insertOne
}
