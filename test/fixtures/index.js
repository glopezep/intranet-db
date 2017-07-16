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
    name: `Office ${id}`,
    number: '8091112222',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing'
  }
}

function getPosition () {
  const id = uuid()
  return {
    id,
    name: `Position ${id}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing'
  }
}

function getUser () {
  const id = uuid()
  return {
    id,
    fullname: `Jhon Doe ${id}`,
    username: `jhondoe-${id}`,
    password: 'password123456',
    extensionNumber: 1234,
    email: `jhondoe${id}@test.com`
  }
}

function getOffices () {
  return [
    getOffice(),
    getOffice(),
    getOffice()
  ]
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
  getUser,
  getProjects,
  getOffices,
  getPositions
}
