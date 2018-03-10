/**
 * @class Mongodb
 */
class Mongodb {
  constructor (colName, mongo) {
    this.colName = colName
    this.mongo = mongo
  }
  find () {
    return new Promise((resolve, reject) => {
      this.mongo.db.collection(this.colName, function (err, collection) {
        if (err) {
          reject(new Error(err))
        }
        return collection
          .find()
          .toArray(function (err, data) {
            if (err) {
              reject(new Error(err))
            }
            resolve(data)
          })
      })
    })
  }
}

module.exports = Mongodb
