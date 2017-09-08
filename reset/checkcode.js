
const redis = require('../redis')
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

  const {  id  } = ctx.request.decoded

  const { code } = ctx.request.body

  if(!code) {
    return ctx.body = { code: 400, message: '缺少必要的参数 code', data: '' }
  }

  const { email } = await User.findById({ _id: id })

  const reply = await getredis(email)

  if( code === reply ) {
    ctx.body = { code: 201, message: 'ok', data: true  }
  }

  else {
    ctx.body = { code: 422, message: '验证码无效', data: false }
  }

}
