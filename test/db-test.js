import test from 'ava'
import IntranetDB from '../'

test.before(async t => {
  const db = new IntranetDB()
  t.context.db = db
  await db.setup()
})

test.after.always(async t => {
  const db = t.context.db

  t.is(typeof db.drop, 'function', 'Should be a function')

  await db.drop()
})

test('Should be pass', t => {
  t.pass()
})
