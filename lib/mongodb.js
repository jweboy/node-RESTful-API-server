const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const { url } = require('../config/mongodb')
const goodsSchema = require('./schema/goods')

mongolass.connect(url)

exports.Goods = mongolass.model('malls', goodsSchema)
