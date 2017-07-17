const Sequelize = require('sequelize')
const sequelizeHierarchy = require('sequelize-hierarchy')
const config = require('../config')

sequelizeHierarchy(Sequelize)

let { dbName, dbUser, dbPassword, extra } = config

if (process.NODE_ENV !== 'production') {
  dbName = 'intranet_test'
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, extra)

module.exports = sequelize
