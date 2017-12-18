// const { insertOne } = require('../../models/user')

async function signin (ctx) {
  console.log(ctx.request.body)
  // ctx.req.
  // ctx.req.addListener('data', (data) => {
  //   console.log('data', data)
  // })
  // const user = ctx.request.body
  ctx.body = {
    success: true,
    message: '成功创建新用户'
  }
  // ctx.body = await insertOne(user)
    // .then(data => {
    //   console.log('res', data)
      // ctx.body = {
      //   success: true,
      //   message: '创建成功'
      // }
    // })
}

module.exports = {
  signin
}
