const uuid = require('uuid/v4')

function getProject () {
  const id = uuid()
  return {
    id,
    name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    imageURL: `http://intranet.test/uploads/${id}`,
    extURL: 'http://extlink.test/'
  }
}

function getPosition () {
  const id = uuid()
  return {
    id,
    name: 'Soporte IT',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing'
  }
}

function getProjects () {
  return [
    getProject(),
    getProject(),
    getProject()
  ]
}

module.exports = {
  getProject,
  getPosition,
  getProjects
}
