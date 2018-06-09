process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const jsonSchema = require('chai-json-schema')
const { getFileSuccess } = require('../schema/upload/getFile')

const fastify = require('../app')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(jsonSchema)

describe('/api/upload', () => {
  it('should delete picture with fileKey', (done) => { 
    fastify.inject({
      method: 'DELETE',
      url: '/api/upload/5af983fdd07a3915dce2c935'
    }, (err, response) => {
      expect(err).to.be.null
      expect(response).to.have.status(404)
      expect(response).to.have.header('content-type', /application\/json/)
      expect(response).to.be.json
      done()
    })
  })  
  
  // it('should PUT file to QiniuCloud', (done) => {
    // const dispatch = function (req, res) {
    //   console.log(req);
    //   res.writeHead(200)
    //   // res.write('a')
    //   // res.write(Buffer.from('b'))
    //   // res.end()
    // }
    // fastify.inject({
    //   method: 'PUT',
    //   url: '/api/upload',
    //   payload: { imageField: fs.readFileSync('static/nodejs.png') },
    //   server: dispatch,
    // }, (err, response) => { 
    //   console.log(err, response.payload);
    //   // expect(err).to.be.null
    //   // expect(response).to.have.status(409)
    //   // expect(response).to.have.header('content-type', /application\/json/)
    //   // expect(response).to.be.json
    //   done()
    // })
    // fastify.put('/api/upload')
  // })

  it('should see picture list json', (done) => {
    fastify.inject({
      method: 'GET',
      url: '/api/upload/list?page=1&&size=5',
    }, (err, response) => { 
      expect(err).to.be.null
      expect(response).to.have.status(200)
      expect(response).to.have.header('content-type', /application\/json/)
      expect(response).to.be.json
      expect(response).to.be.jsonSchema(getFileSuccess)
      done()
      })
  })
})