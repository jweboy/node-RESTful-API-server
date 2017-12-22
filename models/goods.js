const shortid = require('shortid')
const { Goods } = require('../lib/mongodb')

const SIZE = 10
const compose = (item, id, val) => item
  .split(',')
  .reduce((res, curr) => {
    res.push({
      [id]: shortid.generate(),
      [val]: curr
    })
    return res
  }, [])

const composeItem = (prev) => ({
  ...prev,
  thumbnail: compose(prev.thumbnail, 'tid', 'url'),
  version: prev.version || null,
  color: compose(prev.color, 'cid', 'text')
})

const reduceGoods = (ary) => ary.reduce((res, curr) => {
  res.push(composeItem(curr))
  return res
}, [])

Goods.plugin('findAll', {
  afterFind: (all) => ({
    data: all,
    total: all.length
  })
})
Goods.plugin('findByPagination', {
  afterFind: (goods, count) => {
    goods = reduceGoods(goods)
    return {
      data: goods,
      total: count
    }
  }
})

const pagination = async ({ page }) => {
  const { total } = await all()
  return Goods
  .find()
  .findByPagination(total)
  .skip(SIZE * (page - 1)) //* skip在数据量大的时候会有性能问题
  .limit(SIZE)
  .exec()
}

const all = () => Goods
  .find()
  .findAll()
  .exec()

module.exports = {
  all,
  pagination
}
