// process.env.NODE_ENV = 'test'

// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const fs = require('fs')
// const jsonSchema = require('chai-json-schema')
// const { getFileSuccess } = require('../schema/upload/getFile')

// const { server } = require('../app')

// const expect = chai.expect

// chai.use(chaiHttp)
// chai.use(jsonSchema)

// // // // let fastify = null
// // // describe('Node RESTful API', () => {
// // //   describe('/api', () => {
// // //     // it('should delete picture with fileKey', (done) => { 
// // //     //   chai.request(app)
// // //     //     .delete('/api/upload/picture/:fileKey')
// // //     //     .end((err, res) => {
// // //     //       expect(err).to.be.null
// // //     //       expect(res).to.have.status(612)
// // //     //       expect(res).to.have.header('content-type', /application\/json/)
// // //     //       expect(res).to.be.json
// // //     //       done()
// // //     //     })
// // //     // })  
// // //   })
// // // })

// describe('/api/upload', () => {
//   it('should PUT file to QiniuCloud', (done) => {
//       chai.request(server)
//         .put('/api/upload')
//         .attach('imageField', fs.readFileSync('static/nodejs.png'), 'nodejs.png')
//         .end((err, res) => { 
//           expect(err).to.be.null
//           expect(res).to.have.status(409)
//           expect(res).to.have.header('content-type', /application\/json/)
//           expect(res).to.be.json

//           done()
//         })
//   })
  
//   it('should see picture list json', (done) => {
//       chai.request(server)
//         .get('/api/upload/list')
//         .query({ page: 1, size: 5 })
//         .end((err, res) => {
//           expect(err).to.be.null
//           expect(res).to.have.status(200)
//           expect(res).to.have.header('content-type', /application\/json/)
//           expect(res).to.be.json
//           expect(res).to.be.jsonSchema(getFileSuccess)
//           done()
//         })
//     })
// })