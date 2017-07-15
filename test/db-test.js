import test from 'ava'
import IntranetDB from '../'
import fixtures from './fixtures'

const db = new IntranetDB()

test.before(async t => {
  t.is(typeof db.setup, 'function', 'Should be a function')
  await db.setup()
})

test.after.always(async t => {
  t.is(typeof db.drop, 'function', 'Should be a function')
  await db.drop()
})

test('Save a project', async t => {
  t.is(typeof db.saveProject, 'function', 'Should be a function')

  const project = fixtures.getProject()
  const created = await db.saveProject(project)
  const result = created.get({ plain: true })

  t.is(result.id, project.id)
  t.is(result.name, project.name)
  t.is(result.description, project.description)
  t.is(result.imageURL, project.imageURL)
  t.is(result.extURL, project.extURL)
})

test('List all projects', async t => {
  t.is(typeof db.getProjects, 'function', 'Should be a function')

  const projects = fixtures.getProjects()
  const saveProjects = projects.map(project => {
    return db.saveProject(project)
  })

  await Promise.all(saveProjects)

  let result = await db.getProjects()
  t.truthy(result.length)
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
