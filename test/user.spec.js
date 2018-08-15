// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const fs = require('fs')
// const jsonSchema = require('chai-json-schema')
// const { getFileSuccess } = require('../schema/upload/getFile')

// const fastify = require('../app')

// const expect = chai.expect

// chai.use(chaiHttp)
// chai.use(jsonSchema)

// describe('/api/user', () => {
//   it('should signup user', (done) => {
//     fastify.inject({
//       method: 'POST',
//       url: '/api/user/signup',
//       payload: { username: 'test', password: '123' }
//     }, (err, response) => {
//       expect(err).to.be.null
//       expect(response).to.have.status(409)
//       expect(response).to.have.header('content-type', /application\/json/)
//       expect(response).to.be.json
//       done()
//     })
//   })

//   it('should signin user', (done) => {
//     fastify.inject({
//       method: 'POST',
//       url: '/api/user/signin',
//       payload: { username: 'test', password: '123' },
//       headers: {
//         authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE1MjgzNzQ2NjF9.0Frf5AMOj92lIMkaCDOPvbJD_Z1o_S37cVdJcWqdQwE'
//       }
//     }, (err, response) => {
//       expect(err).to.be.null
//       expect(response).to.have.status(200)
//       expect(response).to.have.header('content-type', /application\/json/)
//       expect(response).to.be.json
//       done()
//     })
//   })
// })