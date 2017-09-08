
const User = require('../model/User')
const generate_nonstr = require('./generate_nonstr')
const redis = require('../redis')
const send_email = require('./send_email')
const { cert } = require('../config')
const { isEmail } = require('../utils/Validate')

module.exports = async (ctx) => {

  const { email, salt } = ctx.request.body

  if(salt !== cert) {
    return ctx.body = { code: 443, message: 'bad request', data: ''}
  }

  if(!isEmail(email)) {
    return ctx.body = { code: 477, message: 'bad email type' , data: ''}
  }

  const isThere = await User.findOne({ email: email })

  if(!isThere) {
    return ctx.body = { code: 478, message: 'the email is not registered', data: ''}
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