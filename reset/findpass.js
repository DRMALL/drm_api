
const User = require('../model/User')
const generate_nonstr = require('./generate_nonstr')
const redis = require('../redis')
const send_email = require('./send_email')

module.exports = async (ctx) => {


  const { id } = ctx.request.decoded

  const { email } = await User.findById({ _id: id })

  //生成随机字符串
  const nonstr = generate_nonstr(4)

  // 存入redis, 和用户信息捆绑，设置有效期5分钟，done
  redis.set(email, nonstr, 'EX', 60 * 5)

  //发送邮件，promise
  //should return promise
  //ctx.body = '已发送邮件，请注意查收'
  result = await send_email(email, nonstr)()

  ctx.body = { code: 200, message: 'ok', data: '已发送邮件，请注意查收' }

}