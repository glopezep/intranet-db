const sequelizeConfig = require('../lib/sequelize')

const { sequelize, Sequelize } = sequelizeConfig

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING
})

module.exports = {
  Project
}
