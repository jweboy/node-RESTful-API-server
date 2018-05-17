const chai = require('chai')
const chaiHttp = require('chai-http')

const { server } = require('../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('/api', () => {
  it('should see fastify RESTful API', (done) => {
    chai.request(server)
      .get('/api')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('content-type', 'text/plain; charset=utf-8')
        expect(res).to.be.text
        done()
      })
  })
})