const Promise = require('bluebird')
const sequelizeConfig = require('./sequelize')

const { sequelize } = sequelizeConfig

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
