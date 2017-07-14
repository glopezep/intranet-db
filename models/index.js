const Sequelize = require('sequelize')
const sequelize = require('../lib/sequelize')

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING
})

module.exports = {
  Project
}
