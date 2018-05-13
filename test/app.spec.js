const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
// const jsonSchema = require('chai-json-schema')

const app = require('../app')

const expect = chai.expect

chai.use(chaiHttp)
// chai.use(jsonSchema)

let fastify = null
describe('Node RESTful API', () => {
  describe('/api', () => {
    it('should see fastify resful api', (done) => {
      chai.request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', /^text/)
          expect(res).to.be.text
          done()
        })
    })
    it('should see picture list json', (done) => {
      chai.request(app)
        .get('/api/upload/picture/list')
        .query({ page: 1, size: 10 })
        .end((err, res) => {
          // TODO: 后面考虑增加Schema部分
          // const jsonSchema = {
          //   title: 'schema-test',
          //   type: 'array',
          //   properties: {
          //     code: {
          //       type: 'string'
          //     }
          //   }
          // }
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', /application\/json/)
          expect(res).to.be.json
          done()
        })
    })
    it('should delete picture with fileKey', (done) => { 
      chai.request(app)
        .delete('/api/upload/picture/:fileKey')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(612)
          expect(res).to.have.header('content-type', /application\/json/)
          expect(res).to.be.json
          done()
        })
    })  
    it('should post pitcure for images', (done) => {
      chai.request(app)
        .put('/api/upload/picture')
        .attach('imageField', fs.readFileSync('static/nodejs.png'), 'nodejs.png')
        .end((err, res) => { 
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', /application\/json/)
          expect(res).to.be.json
          done()
        })
    })
  })
})