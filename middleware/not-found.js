exports.NotFound = async function notFound (ctx) {
  // We need to explicitly set 404 here
  // So that koa doesn't assign 200 on body
  ctx.status = 404

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<p>Page Not Found => HTML</p>'
      break
    case 'json':
      ctx.body = {
        message: 'Page Not Found => JSON'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found => TEXT'
  }
}
