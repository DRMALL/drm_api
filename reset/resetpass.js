
const { hash } = require('../utils/util')
const User = require('../model/User')


module.exports = async (ctx) => {

  const { pass, email } = ctx.request.body

  if(!pass || !email) {
    return ctx.body = { code: 400, message: '缺少必要的参数pass, email', data: '' }
  }

  //修改密码 
  const encryptPass = await hash(pass)
  const result = await User.findOneAndUpdate({ email: email }, { password: encryptPass }, { new: true }) 
  ctx.body = { code: 200, message: 'ok', data: result }

}