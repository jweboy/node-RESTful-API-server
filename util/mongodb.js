const CreateErrors = require('http-errors')
const mongoose = require('mongoose')
const statusCode = require('../config/statusCode')

/**
 * @class Mongodb
 */
class Mongodb {
  constructor (db) {
    this.db = db
  }
  /**
   * 验证id是否是ObjectID类型
   * @param {String} id - 在数据库中查询的id
   */
  static validIsObjectId (id) {
    return mongoose.Types.ObjectId.isValid(id)
  }
  /**
   * 获取列表总数
   *
   * @returns 指定列表的长度
   * @memberof Mongodb
   */
  count () {
    // 数据量超大时候 count性能有问题 这是一个可持续优化的点
    // 参考 https://cnodejs.org/topic/559a0bf493cb46f578f0a601
    return new Promise((resolve, reject) => this.db
      .count()
      .then(count => resolve(count))
      .catch(err => reject(new CreateErrors(500, err)))
    )
  }
  /**
   * 数据库分页查找
   *
   * @param {Object} query - 分页对象
   * @param {Number} query.page - 页码
   * @param {Number} query.size - 页数
   * @returns
   * @memberof Mongodb
   */
  pageQuery ({ page = 1, size = 10 }) {
    return new Promise((resolve, reject) => this.db
      .find()
      .skip(size * (page - 1)) // TODO: skip在数据量大的时候会有性能问题
      .limit(size)
      .exec(function (err, data) {
        if (err) {
          return reject(new CreateErrors(500, err))
        }
        resolve(data)
      }))
  }
  /**
   * 数据库中查找对应项
   *
   * @param {Object} body - 查找对象
   * @returns {Promise}
   * @memberof Mongodb
   */
  findOne (body) {
    return new Promise((resolve, reject) => {
      this.db
        .findOne(body, function (err, data) {
          if (err) {
            reject(err)
          }
          resolve(data)
        })
    })
  }
  /**
   * 数据库插入对应项
   *
   * @param {Object} body - 插入对象
   * @returns {Promise}
   * @memberof Mongodb
   */
  insertOne (body) {
    return new Promise(async (resolve, reject) => {
      try {
        const findResult = await this.findOne(body)
        // 数据库已经存在
        if (!!findResult) { // eslint-disable-line 
          reject(new CreateErrors(409, statusCode['409']))
        } else {
          const insertResult = await this.db.create(body)
          resolve(insertResult._doc)
        }
      } catch (err) {
        reject(new CreateErrors(500, err))
      }
    })
  }
  /**
   * 数据库删除指定项
   *
   * @param {Object} body - 删除对象
   * @returns {Promise}
   * @memberof Mongodb
   */
  findOneAndDelete (body) {
    return new Promise(async (resolve, reject) => {
      const validResult = Mongodb.validIsObjectId(body._id)
      if (!validResult) {
        reject(new CreateErrors.BadRequest('无效的id'))
      }
      this.db
        .findOneAndDelete(body, function (err, data) {
          if (err) {
            return reject(new CreateErrors(500, err))
          }
          // 查询项不存在
          if (data === null) {
            reject(new CreateErrors.NotFound())
          }
          resolve(data)
        })
    })
  }
}

module.exports = Mongodb
