exports.postSignupBody = {
  $id: 'postSignupBody',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password']
}
