const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const { url } = require('../config/mongodb')
const goodsSchema = require('./schema/goods')
const usersSchema = require('./schema/users')

mongolass.connect(url)

exports.Goods = mongolass.model('malls', goodsSchema)
exports.Users = mongolass.model('User', usersSchema)
