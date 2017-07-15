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

function getOffice () {
  const id = uuid()
  return {
    id,
    name: 'Acropolis',
    number: '8091112222',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing'
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

function getPositions () {
  return [
    getPosition(),
    getPosition(),
    getPosition()
  ]
}

module.exports = {
  getProject,
  getOffice,
  getPosition,
  getProjects,
  getPositions
}
