
const redis = require('../redis')
const User = require('../model/User')
const {cert} = require('../config')

const getredis = (email) => {
  return new Promise((resolve, reject) => {
    redis.get(email, (err, reply) => {
      if(err) reject(err)
      resolve(reply)
    })
  })
}

module.exports = async (ctx) => {


  const { code, salt, email } = ctx.request.body

  if( salt !== cert ) {
    return ctx.body = { code: 443, message: 'bad request', data: ''}
  }


  if(!code) {
    return ctx.body = { code: 400, message: '缺少必要的参数 code', data: '' }
  }

  const reply = await getredis(email)

  if( code === reply ) {
    ctx.body = { code: 201, message: 'ok', data: true  }
  }

  else {
    ctx.body = { code: 422, message: '验证码无效', data: false }
  }

}
