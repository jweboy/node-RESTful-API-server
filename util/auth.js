function verifyJWTandLevel(request, reply, done) { 
  const jwt = this.jwt
  const level = this.level
  
  // missing token header
  if (!request.req.headers['token']) { 
    return done(new Error('该请求缺少token'))
  }

  // verify token
  jwt.verify(request.req.headers['token'], onVerify)

  function onVerify(err, decoded) { 
    // valid token
    if (err || !decoded.username || !decoded.password) {
      console.error(err.message)
      return done(new Error('无效的token'))
    }

    level.get(decoded.username, onUser)

    function onUser(err, password) { 
      if (err) { 
        console.error(err.message)
        if (err.notFound) { 
          return done(new Error('无效的token'))
        }
        return done(err)
      }
      if (!password || password !== decoded.password) {
        return done(new Error('无效的token'))
      }
      done()
    }
  }
}

function verifyUserAndPassword(request, reply, done) { 
  const level = this.level

  level.get(request.body.username, onUser)

  function onUser(err, password) {
    // valid password
    if (err) { 
      console.error(err.message)
      if (err.notFound) { 
        return done(new Error('该用户未注册'))
      }
      return done(err)
    }
    if (!password || password !== request.body.password) {
      return done(new Error('密码错误,请稍后重试'))
    }
    done()
  }
}

module.exports = {
  verifyJWTandLevel,
  verifyUserAndPassword
}