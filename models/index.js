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
  number: Sequelize.STRING(11),
  description: Sequelize.STRING
}, {
  indexes: [
    { unique: true, fields: ['name'] }
  ]
})

const Position = sequelize.define('position', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING
}, {
  indexes: [
    { unique: true, fields: ['name'] }
  ]
})

const User = sequelize.define('user', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  fullname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  extensionNumber: Sequelize.STRING,
  email: Sequelize.STRING
}, {
  indexes: [
    { unique: true, fields: ['username', 'email'] }
  ]
})

User.belongsTo(Position)
User.belongsTo(Office)
Office.hasMany(User)

module.exports = {
  Project,
  Office,
  Position,
  User
}
