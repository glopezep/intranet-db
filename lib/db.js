const Promise = require('bluebird')
const sequelize = require('./sequelize')
const models = require('../models')
const utils = require('./utils')

class IntranetDB {
  async setup (callback) {
    await sequelize.sync()
    return Promise.resolve('Tables created').asCallback(callback)
  }

  async drop (callback) {
    await sequelize.drop()
    return Promise.resolve('Tables droped').asCallback(callback)
  }

  async saveProject (project, callback) {
    try {
      const created = await models.Project.create(project)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getProject (id, callback) {
    try {
      const result = await models.Project.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      if (!result) throw new Error('not found')
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getProjects (callback) {
    try {
      const projects = await models.Project.findAll()
      return Promise.resolve(projects).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateProject (id, data, callback) {
    try {
      const result = await this.getProject(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteProject (id, callback) {
    try {
      const result = await this.getProject(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveOffice (office, callback) {
    try {
      const created = await models.Office.create(office)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getOffice (id, callback) {
    try {
      const result = await models.Office.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getOffices (callback) {
    try {
      const offices = await models.Office.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(offices).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateOffice (id, data, callback) {
    try {
      const result = await this.getOffice(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteOffice (id, callback) {
    try {
      const result = await this.getOffice(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async savePosition (position, callback) {
    try {
      const created = await models.Position.create(position)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getPosition (id, callback) {
    try {
      const result = await models.Position.findOne({
        where: { id }
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getPositions (callback) {
    try {
      const positions = await models.Position.findAll()
      return Promise.resolve(positions).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updatePosition (id, data, callback) {
    try {
      const result = await this.getPosition(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deletePosition (id, callback) {
    try {
      const result = await this.getPosition(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveUser (user, callback) {
    try {
      user.password = utils.encrypt(user.password)
      const created = await models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      const result = await models.User.findOne({
        where: { username },
        include: [ { all: true, nested: true } ]
      })
      if (!result) throw new Error('not found')
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUsers (callback) {
    try {
      const users = await models.User.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUsersByOffice (officeId, callback) {
    try {
      const users = await models.User.findAll({
        where: { officeId },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateUser (id, data, callback) {
    try {
      const result = await this.getUser(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteUser (username, callback) {
    try {
      const result = await this.getUser(username)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveDocumentCategory (documentCategory, callback) {
    try {
      const created = await models.DocumentCategory.create(documentCategory)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDocumentCategory (id, callback) {
    try {
      const result = await models.DocumentCategory.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDocumentCategories (callback) {
    try {
      const result = await models.DocumentCategory.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateDocumentCategory (id, data, callback) {
    try {
      const result = await this.getDocumentCategory(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteDocumentCategory (id, callback) {
    try {
      const result = await this.getDocumentCategory(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveDepartment (department, callback) {
    try {
      const created = await models.Department.create(department)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDepartment (id, callback) {
    try {
      const created = await models.Department.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDepartments (callback) {
    try {
      const created = await models.Department.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDepartmenstByDocumentCategory (documentCategoryId, callback) {
    try {
      const created = await models.Department.findAll({
        where: { documentCategoryId },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateDeparment (id, data, callback) {
    try {
      const result = await this.getDepartment(id)
      const updated = await result.update(data)
      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteDeparment (id, callback) {
    try {
      const result = await this.getDepartment(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveDocument (doc, callback) {
    try {
      const created = await models.Document.create(doc)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDocument (id, callback) {
    try {
      const result = await models.Document.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDocuments (callback) {
    try {
      const result = await models.Document.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getDocumentsByDepartment (departmentId, callback) {
    try {
      const result = await models.Document.findAll({
        where: { departmentId },
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteDocument (id, callback) {
    try {
      const result = await this.getDocument(id)
      if (!result) throw new Error('not found')
      const deleted = JSON.parse(JSON.stringify(result))
      await result.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
}

module.exports = IntranetDB
