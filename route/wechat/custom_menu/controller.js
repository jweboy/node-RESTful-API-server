const { format } = require('util')
// const { access_token } = require('../accessToken')
const { _request } = require('../../../util/_request')
const {
  apiURL: { getMenu, createMenu, deleteMenu },
  appDomain
} = require('../../../config/wechat')

const _replaceUrl = (type, accessToken) => format(
  type,
  appDomain,
  accessToken
)

async function _getMenu (ctx) {
  const accessToken = ctx.cookies.get('accessToken') // TODO accessToken 需要处理成一个中间件的形式
  ctx.body = await _request('GET', _replaceUrl(getMenu, accessToken)) // TODO token 存在cookies里面需要完善
    .then(({ data }) => data)
    .catch(err => err)
}

async function _postMenu (ctx) {
  const accessToken = ctx.cookies.get('accessToken')
  ctx.body = await _request('POST', _replaceUrl(createMenu, accessToken), { // TODO 我需要从ctx里面拿到post的data部分
    button: [{
      type: 'view',
      name: 'ij',
      url: 'http://www.github.com/jweboy/'
    }, {
      type: 'click',
      name: 'jjjjsssj',
      key: 'jjj'
    }]
  })
    .then(data => data)
    .catch(err => err)
}

async function _deleteMenu (ctx) {
  const accessToken = ctx.cookies.get('accessToken')
  ctx.body = await _request('GET', _replaceUrl(deleteMenu, accessToken))
    .then(data => data)
    .catch(err => err)
}

module.exports = {
  getMenu: _getMenu,
  postMenu: _postMenu,
  deleteMenu: _deleteMenu
}
