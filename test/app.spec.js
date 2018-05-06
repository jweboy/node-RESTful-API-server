const chai = require('chai')
const chaiHttp = require('chai-http')
// const jsonSchema = require('chai-json-schema')

const app = require('../app')

const expect = chai.expect

chai.use(chaiHttp)
// chai.use(jsonSchema)

let fastify = null
describe('Node Resful API', () => {
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
        .end((err, res) => {
          // TODO: 后面考虑增加Schema部分
          // const jsonSchema = {
          //   title: 'schema-test',
          //   type: 'object',
          //   properties: {
          //     code: {
          //       type: 'string'
          //     }
          //   }
          // }
          expect(err).to.be.null
          expect(res).to.have.status(200)
          // expect(res).to.have.header('content-type', 'application/json')
          expect(res).to.be.json
          done()
        })
    })
  })
})