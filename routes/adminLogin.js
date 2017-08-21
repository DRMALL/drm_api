
const { initAdmins, cert } = require('../config')
const jwt = require('jsonwebtoken')


module.exports = async (ctx) => {

  const { admin, password } = ctx.request.body
  if(!admin || !password)
    return ctx.body = { code: 400, message: '缺少必要的参数 admin, password', data: '' }
  
  const valid = initAdmins.some((item, index) => {
    return item.admin === admin && item.password === password
  })

  if(!valid)
    return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

  const token = jwt.sign({ admin, password }, cert, { expiresIn: '7d' })
  ctx.body = { code: 201, message: 'ok', data: token }
}
