const Sequelize = require('sequelize')
const config = require('../config')

const { dbName, dbUser, dbPassword, extra } = config
const sequelize = new Sequelize(dbName, dbUser, dbPassword, extra)

class IntranetDB {
  setup () {}
  dropTables () {}
}

module.exports = IntranetDB
