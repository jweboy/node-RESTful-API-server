// const stringify = require('fast-json-stringify')

exports.postUploadPictureSuccess = {
  $id: 'uploadPictureSuccess',
  type: 'object',
  properties: {
    code: { type: 'number' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        id: { type: 'string' }
      }
    }
  }
}

exports.postUploadPictureError = {
  $id: 'uploadPictureError',
  type: 'object',
  properties: {
    code: { type: 'number' },
    message: { type: 'string' },
    data: { type: 'object' }
  }
}

exports.deletePictureBody = {
  $id: 'deletePictureBody',
  type: 'object',
  properties: {
    fileKey: { type: 'string' }
  }
}

exports.deletePictureSuccess = {
  $id: 'deletePictureSuccess',
  type: 'object',
  properties: {
    code: { type: 'number' },
    message: { type: 'string' },
    data: { type: 'object' }
  }
}

exports.deletePictureError = {
  $id: 'deletePictureError',
  type: 'object',
  properties: {
    code: { type: 'number' },
    message: { type: 'string' },
    data: { type: 'object' }
  }
}

exports.getPictureList = {
  $id: 'pictureListSuccess',
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
        }
      }
    }
  }
}
