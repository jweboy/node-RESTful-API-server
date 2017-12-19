const { Users } = require('../lib/mongodb')

const findOne = (user) => {
  return Users
  .findOne(user)
  .exec()
}
const insertOne = async (user) => {
  const _user = await findOne(user)
  if (!_user) { // 数据库不存在user => insert
    const result = await Users
      .insertOne(user)
      .exec()
    return result.ops[0]
  }
  return null
}

module.exports = {
  findOne,
  insertOne
}
