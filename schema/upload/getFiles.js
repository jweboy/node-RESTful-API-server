exports.getFilesSuccess = {
  $id: 'getFilesSuccess',
  type: 'object',
  properties: {
    code: { type: 'number' },
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
              putTime: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  }
}

exports.getFilesQuery = {
  $id: 'getFilesQuery',
  type: 'object',
  properties: {
    page: { type: 'number' },
    size: { type: 'number' }
  },
  required: ['page', 'size']
}
