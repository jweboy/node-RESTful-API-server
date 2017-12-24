// const shortid = require('shortid')
const { Goods } = require('../lib/mongodb')

const SIZE = 10

const reduceResult = ({
  data = [],
  total = 0
}) => {
  return { data, total }
}

// const compose = (item, id, val) => item
//   .split(',')
//   .reduce((res, curr) => {
//     res.push({
//       [id]: shortid.generate(),
//       [val]: curr
//     })
//     return res
//   }, [])

// const composeItem = (prev) => ({
//   ...prev,
//   thumbnail: compose(prev.thumbnail, 'tid', 'url'),
//   version: prev.version || null,
//   color: compose(prev.color, 'cid', 'text')
// })

// const reduceGoods = (ary) => ary.reduce((res, curr) => {
//   res.push(composeItem(curr))
//   return res
// }, [])

const pagination = async ({ page }) => {
  const { total } = await all()
  const goods = await Goods
  .find()
  .skip(SIZE * (page - 1)) //* skip在数据量大的时候会有性能问题
  .limit(SIZE)
    .exec()

  return reduceResult({
    data: goods,
    total
  })
}

const all = async () => {
  const goods = await Goods
    .find()
    .exec()

  return reduceResult({
    data: goods,
    total: goods.length
  })
}

module.exports = {
  all,
  pagination
}
