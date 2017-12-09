const { Goods } = require('../lib/mongodb')

const SIZE = 10

const pagination = ({ page }) => Goods
  .find()
  .skip(SIZE * (page - 1))//* skip在数据量大的时候会有性能问题
  .limit(SIZE)
  .exec()

const all = () => Goods
  .find()
  .exec()

module.exports = {
  all,
  pagination
}
