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

  async getProjects (callback) {
    try {
      const projects = await models.Project.findAll()
      return Promise.resolve(projects).asCallback(callback)
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

  async getOffices (callback) {
    try {
      const offices = await models.Office.findAll({
        include: [ models.User ]
      })
      return Promise.resolve(offices).asCallback(callback)
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

  async getPositions (callback) {
    try {
      const positions = await models.Position.findAll()
      return Promise.resolve(positions).asCallback(callback)
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
        include: [ models.Office, models.Position ]
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
        include: [ models.Office, models.Position ]
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
        include: [ models.Office, models.Position ]
      })
      return Promise.resolve(users).asCallback(callback)
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
}

module.exports = IntranetDB
