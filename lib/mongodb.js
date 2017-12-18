const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const { url } = require('../config/mongodb')
const goodsSchema = require('./schema/goods')
const userSchema = require('./schema/user')

mongolass.connect(url)

exports.Goods = mongolass.model('malls', goodsSchema)
exports.User = mongolass.model('User', userSchema)
