
const redis = require('../redis')
const { hash } = require('../utils/util')
const User = require('../model/User')


const getredis = (email) => {
  return new Promise((resolve, reject) => {
    redis.get(email, (err, reply) => {
      if(err) reject(err)
      resolve(reply)
    })
  })
}


module.exports = async (ctx) => {

  const { id  } = ctx.request.decoded

  const { code, pass } = ctx.request.body

  if(!code || !pass) {
    return ctx.body = { code: 400, message: '缺少必要的参数code,pass', data: '' }
  }

  const { email } = await User.findById({ _id: id })

  const reply = await getredis(email)

  console.log(reply)

  if(code === reply) {
    //修改密码 
    const encryptPass = await hash(pass)
    const result = await User.findOneAndUpdate({ _id: id }, { password: encryptPass }, { new: true }) 
    ctx.body = { code: 200, message: 'ok', data: result }
  }
  else {
    ctx.body = { code: 403, message: '验证码无效', data: '' }
  }


}