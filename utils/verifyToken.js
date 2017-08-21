
const jwt = require('jsonwebtoken')
const { cert } = require('../config')

module.exports = (ctx, next) => {
  const token = ctx.request.query.token
  
  if(!token)
    return ctx.body = { code: 400, message: '缺少必要的参数token', data: '' }

  try {
    const decoded = jwt.verify(token, cert)
    ctx.request.decoded = decoded
    return next()
  }
  catch(e) {
    ctx.body = { code: 5050, message: '验证access_token失败', data: e }
  }
}