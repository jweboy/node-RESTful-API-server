exports.putFileQuery = {
  $id: 'putFileQuery',
  type: 'object',
  properties: {
    bucket: { type: 'string' }
  }
}

exports.putFileSuccess = {
  $id: 'putFileSuccess',
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        hash: { type: 'string' },
        bucket: { type: 'string' },
        createTime: { type: 'number' },
        id: { type: 'string' }
      }
    }
  }
}
