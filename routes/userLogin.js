
const { cert } = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User')

module.exports = async (ctx) => {

  let { email, password } = ctx.request.body

  if(!email || !password)
    return ctx.body = { code: 400, message: '缺少必要的参数 email, password', data: '' }

  let user = await User.findOne({ email })

  if(!user)
    return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

  let isvalid = await bcrypt.compare(password, user.password)

  if(!isvalid)
    return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

  let token = jwt.sign({ id: user._id }, cert, { expiresIn: '7d' } )
  ctx.body = { code: 201, message: 'ok', data: token }
}