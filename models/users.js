const { Users } = require('../lib/mongodb')

const findOne = () => {
  return Users
    .find()
    .exec()
}

const insertOne = (user) => {
  return Users
  // return User
  //   .insertOne(user)
  //   .exec()
}

module.exports = {
  findOne,
  insertOne
}
