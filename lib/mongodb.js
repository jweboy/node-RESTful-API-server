// const Mongolass = require('mongolass')
// const mongolass = new Mongolass()
// const { url } = require('../config/mongodb')
// const goodsSchema = require('./schema/goods')
// const usersSchema = require('./schema/users')
const mongoose = require('mongoose')
const { url } = require('../config/mongodb')
const usersSchema = require('./schema/users')

// mongolass.connect(url)
mongoose.connect(url)

// exports.Goods = mongolass.model('malls', goodsSchema)
exports.Users = mongoose.model('Users', usersSchema)
