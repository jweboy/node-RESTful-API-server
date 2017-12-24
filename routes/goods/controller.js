const { all, pagination } = require('../../models/goods')

async function getDataByPage (ctx) {
  ctx.body = await pagination(ctx.query)
}

async function getAllData (ctx) {
  // if (!result.length) {
  //   ctx.status = 403
  //   return ctx.res.fail({}, '查询失败')
  // }
  ctx.body = await all()
}

function getData (ctx) {
  if (Object.keys(ctx.query).length) {
    return getDataByPage(ctx)
  }
  return getAllData(ctx)
}

module.exports = {
  getData
}
