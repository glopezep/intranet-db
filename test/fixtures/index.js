const uuid = require('uuid/v4')

function getProject () {
  const id = uuid()
  return {
    id,
    name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    image: `http://intranet.test/uploads/${id}`
  }
}

module.exports = {
  getProject
}
