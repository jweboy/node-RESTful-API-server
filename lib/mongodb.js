const mongoose = require('mongoose')
const { url } = require('../config/mongodb')
const usersSchema = require('./schema/users')
const goodsSchema = require('./schema/goods')

mongoose.connect(url, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

exports.Goods = mongoose.model('Goods', goodsSchema)
exports.Users = mongoose.model('Users', usersSchema)
