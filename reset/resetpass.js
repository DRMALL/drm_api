
const { hash } = require('../utils/util')
const User = require('../model/User')


module.exports = async (ctx) => {

  const {  id  } = ctx.request.decoded
  const { pass } = ctx.request.body

  if(!pass) {
    return ctx.body = { code: 400, message: '缺少必要的参数pass', data: '' }
  }

  //修改密码 
  const encryptPass = await hash(pass)
  const result = await User.findOneAndUpdate({ _id: id }, { password: encryptPass }, { new: true }) 
  ctx.body = { code: 200, message: 'ok', data: result }

}