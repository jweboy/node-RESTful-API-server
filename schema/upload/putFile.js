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
    data: { type: 'object' }
  }
}
