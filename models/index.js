const Sequelize = require('sequelize')
const sequelize = require('../lib/sequelize')

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  extURL: Sequelize.STRING
})

const Office = sequelize.define('office', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  number: Sequelize.STRING
})

const Position = sequelize.define('position', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
})

const User = sequelize.define('user', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  numberExtension: Sequelize.INTEGER,
  email: Sequelize.STRING
})

User.belongsTo(Position)
User.belongsTo(Office)

module.exports = {
  Project,
  Office,
  Position,
  User
}
