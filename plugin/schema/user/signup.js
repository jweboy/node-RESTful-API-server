exports.postSignupBody = {
  $id: 'postSignupBody',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password']
}

exports.postSignupSuccess = {
  $id: 'postSignupSuccess',
  type: 'object',
  properties: {
    statusCode: { type: 'string' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        id: { type: 'string' },
        token: { type: 'string' },
        createTime: { type: 'number' }
      }
    }
  }
}
