import test from 'ava'
import IntranetDB from '../'

const db = new IntranetDB()

test.before(async t => {
  t.is(typeof db.setup, 'function', 'Should be a function')
  await db.setup()
})

// test.after.always(async t => {
//   t.is(typeof db.drop, 'function', 'Should be a function')
//   await db.drop()
// })

test('Should be pass', t => {
  t.pass()
})
