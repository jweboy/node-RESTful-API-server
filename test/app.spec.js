// const app = require('../app')
// const supertest = require('supertest')
// // const { assert, expect } = require('chai')

// let request = null

// describe('Server', () => {
//   it('should listen on 3000', (done) => {
//     request = supertest(app.listen())
//     done()
//   })
// })

// describe('Basic', () => {
//   it('should see "Node Koa API Develop Test"', (done) => {
//     request
//       .get('/')
//       // .set('Accept', 'application/text')
//       // .expect('Content-Type','text')
//       .expect(200)
//       .end(done)
//   })

//   it('should see "WeChat API Test"', done => {
//     request
//       .get('/wechat')
//       .expect(200)
//       .end(done)
//   })
// })

// describe('Wechat', () => {
//   describe('AccessToken', () => {
//     it('should get access_token', done => {
//       request
//         .get('/wechat/accessToken')
//         .expect(200, done)
//     })
//   })

//   describe('CustomMenu', () => {
//     it('should get menu', done => {
//       request
//         .get('/wechat/customMenu')
//         .expect(200, done)
//     })
    
//     it('should create post', done => {
//         request
//           .post('/wechat/customMenu')
//           .expect(200, done)
//     })
    
//     it('should create delete', done => {
//       request
//         .delete('/wechat/customMenu')
//         .expect(200, done)
//     })
//   }) 
// })

// describe('Goods', () => {
//   // const router = new Koa()()
//   // app.use(router.routes)
//   it('should get all goods', done => {
//     request
//     .get('/goods')
//     .expect(200, done)
//   })
  
//   it('should get goods by pagination', done => {
//     request
//       .get('/goods?page=1')
//       .expect(200)
//       .end(() => {
//         // done()
//         process.exit(0)
//       })
//   })
// })