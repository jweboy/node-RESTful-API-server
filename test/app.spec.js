const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

const expect = chai.expect

chai.use(chaiHttp)

let fastify = null
describe('Node Resful API', () => {
  describe('/api', () => {
    it('should see fastify resful api', (done) => {
      chai.request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', 'text/plain')
          expect(res).to.be.text
          done()
        })
    })
  })
})