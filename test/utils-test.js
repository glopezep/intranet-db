import test from 'ava'
import utils from '../lib/utils'

test('Encrypt Password', t => {
  const plainPassword = 'password123456'
  const encrypted = 'a4dd5658ec0219465b705ea7c7435d9786a3c66d4f448cabd7488dabceafb699'

  const result = utils.encrypt(plainPassword)

  t.is(result, encrypted)
})
