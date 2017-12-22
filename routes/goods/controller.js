const { all, pagination } = require('../../models/goods')

async function getDataByPage (ctx) {
  ctx.body = await pagination(ctx.query)
}

async function getAllData (ctx) {
  ctx.body = await all()
}

function getData (ctx) {
  if (Object.keys(ctx.query).length) {
    return getDataByPage(ctx)
  }
  return getAllData(ctx)
  // ctx.body =
}

module.exports = {
  getData
}
