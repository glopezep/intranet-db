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

  t.is(project.id, result.id)
  t.is(project.name, result.name)
  t.is(project.description, result.description)
  t.is(project.imageURL, result.imageURL)
  t.is(project.extURL, result.extURL)
})

test('Get project', async t => {
  t.is(typeof db.getProject, 'function', 'getProject Should be a function')

  const project = fixtures.getProject()
  await db.saveProject(project)

  const found = await db.getProject(project.name)
  const result = found.get({ plain: true })

  t.is(project.id, result.id)
  t.is(project.name, result.name)
  t.is(project.description, result.description)
  t.is(project.imageURL, result.imageURL)
  t.is(project.extURL, result.extURL)
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

test('Delete project', async t => {
  t.is(typeof db.deleteProject, 'function', 'deleteProject Should be a function')

  const project = fixtures.getProject()
  await db.saveProject(project)
  const result = await db.deleteProject(project.name)

  t.is(project.id, result.id)
  t.is(project.name, result.name)
  t.is(project.description, result.description)
  t.is(project.imageURL, result.imageURL)
  t.is(project.extURL, result.extURL)
  await t.throws(db.deleteProject('foo'), /not found/)
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

test('Save position', async t => {
  t.is(typeof db.savePosition, 'function', 'savePosition Should be a function')

  const position = fixtures.getPosition()
  const created = await db.savePosition(position)
  const result = created.get({ plain: true })

  t.is(result.id, position.id)
  t.is(result.name, position.name)
  t.is(result.description, position.description)
})

test('Get position', async t => {
  t.is(typeof db.getPosition, 'function', 'getPosition Should be a function')

  const position = fixtures.getPosition()
  await db.savePosition(position)

  const found = await db.getPosition(position.name)
  const result = found.get({ plain: true })

  t.is(position.id, result.id)
  t.is(position.name, result.name)
  t.is(position.description, result.description)
})

test('List all positions', async t => {
  t.is(typeof db.getPositions, 'function', 'getPositions Should be a function')

  const positions = fixtures.getPositions()
  const savePositions = positions.map(position => {
    return db.savePosition(position)
  })

  await Promise.all(savePositions)

  let result = await db.getPositions()
  t.truthy(result.length)
})

test('Delete position', async t => {
  t.is(typeof db.deletePosition, 'function', 'deletePosition Should be a function')

  const position = fixtures.getPosition()
  await db.savePosition(position)
  const result = await db.deletePosition(position.name)

  t.is(position.id, result.id)
  t.is(position.name, result.name)
  t.is(position.description, result.description)
  await t.throws(db.deletePosition('foo'), /not found/)
})

test('Save user', async t => {
  t.is(typeof db.saveUser, 'function', 'saveUser Should be a function')
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
  t.is(user.officeId, result.officeId)
  t.is(user.positionId, result.positionId)
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
  t.is(user.officeId, result.officeId)
  t.is(user.positionId, result.positionId)
  await t.throws(db.getUser('foo'), /not found/)
})

test('Get all users', async t => {
  t.is(typeof db.getUsers, 'function', 'getUsers should be a function')

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

  const result = await db.deleteUser(user.username)

  t.is(user.id, result.id)
  t.is(user.fullname, result.fullname)
  t.is(user.username, result.username)
  t.is(user.password, result.password)
  t.is(user.email, result.email)
  t.is(user.officeId, result.officeId)
  t.is(user.positionId, result.positionId)
  await t.throws(db.deleteUser('foo'), /not found/)
})

test('Save Document Category', async t => {
  t.is(typeof db.saveDocumentCategory, 'function', 'saveDocumentCategory Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const created = await db.saveDocumentCategory(documentCategory)
  const result = created.get({ plain: true })

  t.is(documentCategory.id, result.id)
  t.is(documentCategory.name, result.name)
  t.is(documentCategory.description, result.description)
})

test('Get Document Category', async t => {
  t.is(typeof db.getDocumentCategory, 'function', 'getDocumentCategory Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  await db.saveDocumentCategory(documentCategory)

  const found = await db.getDocumentCategory(documentCategory.name)
  const result = found.get({ plain: true })

  t.is(documentCategory.id, result.id)
  t.is(documentCategory.name, result.name)
  t.is(documentCategory.description, result.description)
})

test('Get all Document Categories', async t => {
  t.is(typeof db.getDocumentCategories, 'function', 'getDocumentCategories Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  await db.saveDocumentCategory(documentCategory)

  const result = await db.getDocumentCategories()

  t.truthy(result.length)
})

test('Delete Document Category', async t => {
  t.is(typeof db.deleteDocumentCategory, 'function', 'deleteDocumentCategory Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  await db.saveDocumentCategory(documentCategory)

  const result = await db.deleteDocumentCategory(documentCategory.name)

  t.is(documentCategory.id, result.id)
  t.is(documentCategory.name, result.name)
  t.is(documentCategory.description, result.description)
})

test('Save Department', async t => {
  t.is(typeof db.saveDepartment, 'function', 'saveDepartment Should be a function')
  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()

  department.documentCategoryId = documentCategory.id

  await db.saveDocumentCategory(documentCategory)

  const created = await db.saveDepartment(department)
  const result = created.get({ plain: true })

  t.is(department.id, result.id)
  t.is(department.name, result.name)
  t.is(department.description, result.description)
})

test('Get Department', async t => {
  t.is(typeof db.getDepartment, 'function', 'getDepartment Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()

  department.documentCategoryId = documentCategory.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)

  const result = await db.getDepartment(department.name)

  t.is(department.id, result.id)
  t.is(department.name, result.name)
  t.is(department.description, result.description)
})

test('Get Departments', async t => {
  t.is(typeof db.getDepartments, 'function', 'getDepartments Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()

  department.documentCategoryId = documentCategory.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)

  const result = await db.getDepartments()

  t.truthy(result.length)
})

test('Get Departments by document Category', async t => {
  t.is(typeof db.getDepartmenstByDocumentCategory, 'function', 'getDepartmenstByDocumentCategory Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()

  department.documentCategoryId = documentCategory.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)

  const result = await db.getDepartmenstByDocumentCategory(documentCategory.id)

  t.truthy(result.length)
})

test('Delete Department', async t => {
  t.is(typeof db.deleteDeparment, 'function', 'deleteDeparment Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()

  department.documentCategoryId = documentCategory.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)

  const result = await db.deleteDeparment(department.name)

  t.is(department.id, result.id)
  t.is(department.name, result.name)
  t.is(department.description, result.description)
})

test('Save Document', async t => {
  t.is(typeof db.saveDocument, 'function', 'saveDocument Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()
  const doc = fixtures.getDocument()

  department.documentCategoryId = documentCategory.id
  doc.departmentId = department.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)
  const created = await db.saveDocument(doc)

  const result = created.get({ plain: true })

  t.is(doc.id, result.id)
  t.is(doc.name, result.name)
  t.is(doc.description, result.description)
  t.is(doc.fileURL, result.fileURL)
  t.is(doc.extension, result.extension)
  t.is(doc.departmentId, result.departmentId)
})

test('Get Document', async t => {
  t.is(typeof db.getDocument, 'function', 'getDocument Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()
  const doc = fixtures.getDocument()

  department.documentCategoryId = documentCategory.id
  doc.departmentId = department.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)
  await db.saveDocument(doc)

  const found = await db.getDocument(doc.name)
  const result = found.get({ plain: true })

  t.is(doc.id, result.id)
  t.is(doc.name, result.name)
  t.is(doc.description, result.description)
  t.is(doc.fileURL, result.fileURL)
  t.is(doc.extension, result.extension)
  t.is(doc.departmentId, result.departmentId)
})

test('Get all Documents', async t => {
  t.is(typeof db.getDocuments, 'function', 'getDocuments Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()
  const doc = fixtures.getDocument()

  department.documentCategoryId = documentCategory.id
  doc.departmentId = department.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)
  await db.saveDocument(doc)

  const result = await db.getDocuments()

  t.truthy(result.length)
})

test('Get all Documents by department', async t => {
  t.is(typeof db.getDocuments, 'function', 'getDocuments Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()
  const doc = fixtures.getDocument()

  department.documentCategoryId = documentCategory.id
  doc.departmentId = department.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)
  await db.saveDocument(doc)

  const result = await db.getDocumentsByDepartment(department.id)

  t.truthy(result.length)
})

test('Get Document', async t => {
  t.is(typeof db.deleteDocument, 'function', 'deleteDocument Should be a function')

  const documentCategory = fixtures.getDocumentCategory()
  const department = fixtures.getDepartment()
  const doc = fixtures.getDocument()

  department.documentCategoryId = documentCategory.id
  doc.departmentId = department.id

  await db.saveDocumentCategory(documentCategory)
  await db.saveDepartment(department)
  await db.saveDocument(doc)

  const result = await db.deleteDocument(doc.name)

  t.is(doc.id, result.id)
  t.is(doc.name, result.name)
  t.is(doc.description, result.description)
  t.is(doc.fileURL, result.fileURL)
  t.is(doc.extension, result.extension)
  t.is(doc.departmentId, result.departmentId)
})
