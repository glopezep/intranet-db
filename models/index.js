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

const DocumentCategory = sequelize.define('documentCategory', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING
})

const Department = sequelize.define('department', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING
}, {
  hierarchy: true
})

const Document = sequelize.define('document', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  fileURL: Sequelize.STRING,
  extension: Sequelize.STRING
})

User.belongsTo(Position)
User.belongsTo(Office)
Office.hasMany(User)
Department.belongsTo(DocumentCategory)
DocumentCategory.hasMany(Department)
Document.belongsTo(Department)
Department.hasMany(Document)

module.exports = {
  Project,
  Office,
  Position,
  User,
  Document,
  DocumentCategory,
  Department
}
