const Sequelize = require('sequelize')
const config = require('../config')

let { dbName, dbUser, dbPassword, extra } = config

if (process.NODE_ENV !== 'production') {
  dbName = 'intranet_test'
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, extra)

module.exports = sequelize
