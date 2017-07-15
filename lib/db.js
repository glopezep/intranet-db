const Promise = require('bluebird')
// const sequelize = require('./sequelize')
const models = require('../models')

class IntranetDB {
  async setup (callback) {
    await models.Project.sync()
    return Promise.resolve('Tables created').asCallback(callback)
  }

  async drop (callback) {
    await models.Project.drop()
    return Promise.resolve('Tables droped').asCallback(callback)
  }

  async saveProject (project, callback) {
    try {
      const created = models.Project.create(project)
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
}

module.exports = IntranetDB
