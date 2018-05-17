exports.getFileSuccess = {
  $id: 'getFileSuccess',
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              id: { type: 'string' },
              createTime: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  }
}

exports.getFileQuery = {
  $id: 'getFileQuery',
  type: 'object',
  properties: {
    page: { type: 'number' },
    size: { type: 'number' }
  },
  required: ['page', 'size']
}
