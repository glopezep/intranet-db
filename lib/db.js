const Sequelize = require('sequelize')
const Promise = require('bluebird')
const config = require('../config')

const { dbName, dbUser, dbPassword, extra } = config
const sequelize = new Sequelize(dbName, dbUser, dbPassword, extra)

class IntranetDB {
  async setup (callback) {
    await sequelize.sync()
    return Promise.resolve('Tables created').asCallback(callback)
  }

  async drop (callback) {
    await sequelize.sync()
    return Promise.resolve('Tables droped').asCallback(callback)
  }
}

module.exports = IntranetDB
