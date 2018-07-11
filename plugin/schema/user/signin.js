exports.postSigninBody = {
  $id: 'postSigninBody',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password']
}

exports.postSigninSuccess = {
  $id: 'postSigninSuccess',
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
