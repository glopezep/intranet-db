import test from 'ava'
import IntranetDB from '../'
import fixtures from './fixtures'
import utils from '../lib/utils'

const db = new IntranetDB()

test.before(async t => {
  t.is(typeof db.setup, 'function', 'Should be a function')
  await db.setup()
})

test.after.always(async t => {
  t.is(typeof db.drop, 'function', 'Should be a function')
  await db.drop()
})

test('Save project', async t => {
  t.is(typeof db.saveProject, 'function', 'saveProject Should be a function')

  const project = fixtures.getProject()
  const created = await db.saveProject(project)
  const result = created.get({ plain: true })

  t.is(result.id, project.id)
  t.is(result.name, project.name)
  t.is(result.description, project.description)
  t.is(result.imageURL, project.imageURL)
  t.is(result.extURL, project.extURL)
})

test('Get project', async t => {
  t.is(typeof db.getProject, 'function', 'getProject Should be a function')

  const project = fixtures.getProject()
  await db.saveProject(project)

  const found = await db.getProject(project.name)
  const result = found.get({ plain: true })

  t.is(project.id, result.id)
  t.is(project.name, result.name)
  t.is(project.number, result.number)
  t.is(project.description, result.description)
})

test('List all projects', async t => {
  t.is(typeof db.getProjects, 'function', 'getProjects Should be a function')

  const projects = fixtures.getProjects()
  const saveProjects = projects.map(project => {
    return db.saveProject(project)
  })

  await Promise.all(saveProjects)

  let result = await db.getProjects()
  t.truthy(result.length)
})

test('Save office', async t => {
  t.is(typeof db.saveOffice, 'function', 'saveOffice Should be a function')

  const office = fixtures.getOffice()
  const created = await db.saveOffice(office)
  const result = created.get({ plain: true })

  t.is(result.id, office.id)
  t.is(result.name, office.name)
  t.is(result.number, office.number)
  t.is(result.description, office.description)
})

test('Get office', async t => {
  t.is(typeof db.getOffice, 'function', 'getOffice Should be a function')

  const office = fixtures.getOffice()
  await db.saveOffice(office)

  const found = await db.getOffice(office.name)
  const result = found.get({ plain: true })

  t.is(office.id, result.id)
  t.is(office.name, result.name)
  t.is(office.number, result.number)
  t.is(office.description, result.description)
})

test('List all offices', async t => {
  t.is(typeof db.getOffices, 'function', 'getOffices Should be a function')

  const offices = fixtures.getOffices()
  const saveOffices = offices.map(office => {
    return db.saveOffice(office)
  })

  await Promise.all(saveOffices)

  let result = await db.getOffices()
  t.truthy(result.length)
})

test('Delete office', async t => {
  t.is(typeof db.deleteOffice, 'function', 'deleteOffice Should be a function')

  const office = fixtures.getOffice()
  await db.saveOffice(office)
  const result = await db.deleteOffice(office.name)

  t.is(office.id, result.id)
  t.is(office.name, result.name)
  t.is(office.number, result.number)
  t.is(office.description, result.description)
  await t.throws(db.deleteOffice('foo'), /not found/)
})

test('Save a position', async t => {
  t.is(typeof db.savePosition, 'function', 'Should be a function')

  const position = fixtures.getPosition()
  const created = await db.savePosition(position)
  const result = created.get({ plain: true })

  t.is(result.id, position.id)
  t.is(result.name, position.name)
  t.is(result.description, position.description)
})

test('List all positions', async t => {
  t.is(typeof db.getPositions, 'function', 'Should be a function')

  const positions = fixtures.getPositions()
  const savePositions = positions.map(position => {
    return db.savePosition(position)
  })

  await Promise.all(savePositions)

  let result = await db.getPositions()
  t.truthy(result.length)
})

test('Save a user', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')
  const office = fixtures.getOffice()
  const position = fixtures.getPosition()
  let user = fixtures.getUser()
  const plainPassword = user.password

  user.officeId = office.id
  user.positionId = position.id

  await db.saveOffice(office)
  await db.savePosition(position)

  const created = await db.saveUser(user)
  const result = created.get({ plain: true })

  t.is(user.id, result.id)
  t.is(user.fullname, result.fullname)
  t.is(user.username, result.username)
  t.is(utils.encrypt(plainPassword), result.password)
  t.is(user.email, result.email)
})

test('Get user', async t => {
  t.is(typeof db.getUser, 'function', 'getUser should be a function')

  const office = fixtures.getOffice()
  const position = fixtures.getPosition()
  const user = fixtures.getUser()

  user.officeId = office.id
  user.positionId = position.id

  await db.saveOffice(office)
  await db.savePosition(position)
  await db.saveUser(user)

  const found = await db.getUser(user.username)
  const result = found.get({ plain: true })

  t.is(user.id, result.id)
  t.is(user.fullname, result.fullname)
  t.is(user.username, result.username)
  t.is(user.password, result.password)
  t.is(user.email, result.email)
  await t.throws(db.getUser('foo'), /not found/)
})

test('Get all users', async t => {
  t.is(typeof db.getUsers, 'function', 'getUser should be a function')

  const office = fixtures.getOffice()
  const position = fixtures.getPosition()
  const user = fixtures.getUser()

  user.officeId = office.id
  user.positionId = position.id

  await db.saveOffice(office)
  await db.savePosition(position)
  await db.saveUser(user)

  const result = await db.getUsers()

  t.truthy(result.length)
})

test('Get users by ofice', async t => {
  t.is(typeof db.getUsersByOffice, 'function', 'getUsersByOffice should be a function')

  const office = fixtures.getOffice()
  const position = fixtures.getPosition()
  const user = fixtures.getUser()

  user.officeId = office.id
  user.positionId = position.id

  await db.saveOffice(office)
  await db.savePosition(position)
  await db.saveUser(user)

  const result = await db.getUsersByOffice(office.id)

  t.truthy(result.length)
})

test('Delete user', async t => {
  t.is(typeof db.deleteUser, 'function', 'deleteUser should be a function')

  const office = fixtures.getOffice()
  const position = fixtures.getPosition()
  const user = fixtures.getUser()

  user.officeId = office.id
  user.positionId = position.id

  await db.saveOffice(office)
  await db.savePosition(position)
  await db.saveUser(user)

  const deleted = await db.deleteUser(user.username)

  t.is(user.id, deleted.id)
  t.is(user.fullname, deleted.fullname)
  t.is(user.username, deleted.username)
  t.is(user.password, deleted.password)
  t.is(user.email, deleted.email)
  await t.throws(db.deleteUser('foo'), /not found/)
})
