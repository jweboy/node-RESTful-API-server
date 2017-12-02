const { format } = require('util')
const { access_token } = require('../accessToken')
const { _request } = require('../../../util/_request')
const {
  apiURL: { getMenu, createMenu, deleteMenu },
  appDomain
} = require('../../../config/wechat')

const _replaceUrl = (type) => format(type, appDomain, access_token)

async function _getMenu(ctx) {
  ctx.body = await _request('GET', _replaceUrl(getMenu))
    .then(({ data }) => data)
    .catch(err => err)
}

async function _postMenu(ctx) {
  ctx.body = await _request('POST', _replaceUrl(createMenu), { // TODO 我需要从ctx里面拿到post的data部分
    button: [{
      type: "view",
      name: "ij",
      url: "http://www.github.com/jweboy/"
    }, {
      type: 'click',
      name: 'jjjjsssj',
      key: 'jjj'
    }],
  })
    .then(data => data)
    .catch(err => err)
}

async function _deleteMenu(ctx) {
  ctx.body = await _request('GET', _replaceUrl(deleteMenu))
    .then(data => data)
    .catch(err => err)
}

module.exports = {
  getMenu: _getMenu,
  postMenu: _postMenu,
  deleteMenu: _deleteMenu
}