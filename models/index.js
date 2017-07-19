const Sequelize = require('sequelize')
const sequelize = require('../lib/sequelize')

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  extURL: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

const ProjectCategory = sequelize.define('projectCategory', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Office = sequelize.define('office', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
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
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
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
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  extensionNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
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
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Department = sequelize.define('department', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hierarchy: true
})

const Document = sequelize.define('document', {
  id: {
    type: Sequelize.CHAR(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fileURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  extension: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Project.belongsTo(ProjectCategory, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
ProjectCategory.hasMany(Project)
User.belongsTo(Position, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
User.belongsTo(Office, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Office.hasMany(User)
DocumentCategory.hasMany(Department)
Department.belongsTo(DocumentCategory, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Department.hasMany(Document)
Document.belongsTo(Department, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

module.exports = {
  Project,
  ProjectCategory,
  Office,
  Position,
  User,
  Document,
  DocumentCategory,
  Department
}
