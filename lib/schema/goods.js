const { Schema } = require('mongoose')

const Goods = new Schema({
  name: { type: String },
  price: { type: String },
  color: { type: String },
  specification: { type: String },
  version: { type: String },
  picture: { type: String },
  thumbnail: { type: String }
})

module.exports = Goods
