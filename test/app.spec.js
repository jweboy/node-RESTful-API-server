const app = require('../app')
const supertest = require('supertest')
const request = supertest.agent(app.listen())

describe('/', () => {
  it('200 => Node Koa API开发测试', (done) => {
    request
      .get('/')
      .expect(200)
    .expect(/Node Koa API开发测试/, done)
  })
})
