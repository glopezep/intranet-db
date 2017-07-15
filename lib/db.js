const Promise = require('bluebird')
const sequelize = require('./sequelize')
// const models = require('../models')

class IntranetDB {
  async setup (callback) {
    await sequelize.sync()
    return Promise.resolve('Tables created').asCallback(callback)
  }

  async drop (callback) {
    await sequelize.drop()
    return Promise.resolve('Tables droped').asCallback(callback)
  }
}

module.exports = IntranetDB
