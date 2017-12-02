const router = require('koa-router')()
const { format } = require('util')
const path = require('path')
const fs = require('fs')
const { _request } = require('../../../util/_request')
const {
  apiURL: { accessTokenApi },
  appDomain,
  appID,
  appSecret
} = require('../../../config/wechat')

async function getAccessToken() {
  // 当前时间戳
  const currentTime = new Date().getTime()
  // 格式化url
  const url = format(accessTokenApi, appDomain, appID, appSecret)
  // 当前目录的json文件
  const jsonFile = path.resolve(__dirname, '../accessToken.json')
  return await _request('GET', url)
    .then(async ({ errcode, data }) => {
      if (errcode === 0) { // success
        await fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4))
        return data
      }
      // access_token过期 // TODO 这里需要refresh token 等两个小时之后遇到再加 => {"errcode":40013,"errmsg":"invalid appid"}
      return data
    })
}

module.exports = () => {
  return router
    .get('/', async (ctx) => {
      ctx.body = await getAccessToken()
    })
}
