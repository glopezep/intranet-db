const Promise = require('bluebird')
const sequelize = require('./sequelize')
const models = require('../models')

console.log(models.Project)

class IntranetDB {
  async setup (callback) {
    await models.Project.sync()
    return Promise.resolve('Tables created').asCallback(callback)
  }

  async drop (callback) {
    await sequelize.sync()
    return Promise.resolve('Tables droped').asCallback(callback)
  }
}

module.exports = IntranetDB
