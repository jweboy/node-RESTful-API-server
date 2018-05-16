// // process.env.NODE_ENV = 'test'

// // const chai = require('chai')
// // const chaiHttp = require('chai-http')
// // const fs = require('fs')
// // const supertest = require('supertest')
// // // const jsonSchema = require('chai-json-schema')

// // const fastify = require('../app')

// // const expect = chai.expect

// // chai.use(chaiHttp)
// // // chai.use(jsonSchema)

// // // let fastify = null
// // describe('Node RESTful API', () => {
// //   describe('/api', () => {
// //     it('should see fastify RESTful API', async (done) => {
// //       // fastify.inject({
// //       //   methods: 'GET',
// //       //   url: '/api/upload/picture/list?apage=1&&size=10'
// //       // }, (err, res) => {
// //       //   console.log(err, res.statusCode);
// //       // })
// //       await fastify.ready()
// //       const response = await supertest(fastify.server)
// //         .get('/api/upload/picture/list?page=1&&size=10')
// //         .expect(200)
// //         .expect('Content-Type', 'application/json; charset=utf-8')
// //         .end((err, res) => {
// //           console.log('err', err, res.statusCode);
// //           done()
// //         })
// //       // request(app.server)
// //       //   .get('/api')
// //       //   // .expect(200)
// //       //   .end((err, res) => {
// //       //     console.log('err', res);
// //       //   //   expect(err).to.be.null
// //       //   //   expect(res).to.have.status(200)
// //       //   //   expect(res).to.have.header('content-type', /^text/)
// //       //   //   expect(res).to.be.text
// //       //     done()
// //       //   })
// //     })
// //     // it('should see picture list json', (done) => {
// //     //   chai.request(app)
// //     //     .get('/api/upload/picture/list')
// //     //     .query({ page: 1, size: 10 })
// //     //     .end((err, res) => {
// //     //       // TODO: 后面考虑增加Schema部分
// //     //       // const jsonSchema = {
// //     //       //   title: 'schema-test',
// //     //       //   type: 'array',
// //     //       //   properties: {
// //     //       //     code: {
// //     //       //       type: 'string'
// //     //       //     }
// //     //       //   }
// //     //       // }
// //     //       expect(err).to.be.null
// //     //       expect(res).to.have.status(200)
// //     //       expect(res).to.have.header('content-type', /application\/json/)
// //     //       expect(res).to.be.json
// //     //       done()
// //     //     })
// //     // })
// //     // it('should delete picture with fileKey', (done) => { 
// //     //   chai.request(app)
// //     //     .delete('/api/upload/picture/:fileKey')
// //     //     .end((err, res) => {
// //     //       expect(err).to.be.null
// //     //       expect(res).to.have.status(612)
// //     //       expect(res).to.have.header('content-type', /application\/json/)
// //     //       expect(res).to.be.json
// //     //       done()
// //     //     })
// //     // })  
// //     // it('should post pitcure for images', (done) => {
// //     //   chai.request(app)
// //     //     .put('/api/upload/picture')
// //     //     .attach('imageField', fs.readFileSync('static/nodejs.png'), 'nodejs.png')
// //     //     .end((err, res) => { 
// //     //       expect(err).to.be.null
// //     //       expect(res).to.have.status(200)
// //     //       expect(res).to.have.header('content-type', /application\/json/)
// //     //       expect(res).to.be.json
// //     //       done()
// //     //     })
// //     // })
// //   })
// // })


// (async function () { 
//   const tap = require('tap')
//   const supertest = require('supertest')
//   const fs = require('fs')
//   const fastify = require('../app')

//   await fastify.ready()
//   tap.test('GET `/api` route', async (t) => {
//     t.tearDown(() => fastify.close())
  
//     const res = await supertest(fastify.server)
//       .get('/api')
//       .expect(200)
//       .expect('Content-Type', 'text/plain; charset=utf-8')
    
//     // t.deepEqual(res.text, 'fastify RESTful API')
//   })

//   tap.test('GET `/api/upload` route', async (t) => {
//     // t.tearDown(() => fastify.close())
  
//     const res = await supertest(fastify.server)
//       .put('/api/upload/picture')
//       .attach('imageField', fs.readFileSync('static/nodejs.png'), 'nodejs.png')
//       .expect('Content-Type', 'text/plain; charset=utf-8')
    
//     console.log(res);
    
//     // t.deepEqual(res.text, 'fastify RESTful API')
//   })
// }())


// // tap.test('GET `/list` route', async (t) => {
// //   t.tearDown(() => fastify.close())

// //   await fastify.ready()

// //   const response = await supertest(fastify.server)
// //     .get('/api/upload/picture/list')
// //       .query({ page: 1, size: 10 })
// //       .expect(200)
// //       .expect('Content-Type', 'application/json; charset=utf-8')
// //   // t.deepEqual(response.body, { hello: 'world' })
// // })