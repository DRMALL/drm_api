
const User = require('../model/User')
const generate_nonstr = require('./generate_nonstr')
const redis = require('../redis')
const send_email = require('./send_email')
const { cert } = require('../config')
const { isEmail } = require('../utils/Validate')

module.exports = async (ctx) => {

  const { email, salt } = ctx.request.body

  if(salt !== cert) {
    return ctx.body = { code: 443, message: '请求有误', data: 'bad request'}
  }

  if(!isEmail(email)) {
    return ctx.body = { code: 477, message: '邮箱格式输入有误' , data: 'bad email type'}
  }

  const isThere = await User.findOne({ email: email })

  if(!isThere) {
    return ctx.body = { code: 478, message: '该邮箱未注册', data: 'the email is not registered'}
  }

  //生成随机字符串
  const nonstr = generate_nonstr(4)

  // 存入redis, 和用户信息捆绑，设置有效期5分钟，done
  redis.set(email, nonstr, 'EX', 60 * 60)

  //发送邮件，promise
  //should return promise
  //ctx.body = '已发送邮件，请注意查收'
  result = await send_email(email, nonstr)()

  ctx.body = { code: 200, message: 'ok', data: '已发送邮件，请注意查收' }

}