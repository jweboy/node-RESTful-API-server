// const chai = require('chai')
// const chaiHttp = require('chai-http')

// const fastify = require('../app')

// const expect = chai.expect

// chai.use(chaiHttp)

// describe('/api', () => {
//   it('should see fastify RESTful API', (done) => {
//     fastify.inject({
//       method: 'GET',
//       url: '/api',
//     }, (err, response) => { 
//       expect(err).to.be.null
//       expect(response).to.have.status(200)
//       expect(response).to.have.header('content-type', 'text/plain; charset=utf-8')
//       expect(response).to.be.text
//       done()
//     })
//   })
// })