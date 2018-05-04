/**
 * @class Mongodb
 */
class Mongodb {
  constructor (colName, mongo) {
    this.colName = colName
    this.collection = mongo.db.collection(colName)
  }
  find () {
    return new Promise((resolve, reject) => {
      return this.collection
          .find()
          .toArray(function (err, data) {
            if (err) reject(new Error(err))

            resolve(data)
          })
    })
  }
}

module.exports = Mongodb
