const Router = require('koa-router')
const adminUser = new Router()
const logger = require('../../utils/logger')
const User = require('../../model/User')
const { isEmail, isPhone } = require('../../utils/Validate')
const { hash } = require('../../utils/util')

//获取所有用户
adminUser.get('/', async (ctx) => {
  let { type } = ctx.query
  try {
    if(type === 'name') {
      let docs = await User.find({}, 'name').sort('-createdAt')
      return ctx.body = { code: 200, message: 'ok', data: docs }
    }
    let result = await User.find({}, '-password').sort('-createdAt')
    ctx.body = { code: 200, message: 'ok', data: result }
  }
  catch(e) {
    logger.error('admin get users error: ', e)
    ctx.body = { code: 500, message: 'admin get users error: ', data: e }
  }
})

//新建用户
adminUser.post('/new', async (ctx) => {

  let { name, password, email, phone, company_name, address } = ctx.request.body
  if(!name || !password || !email || !phone || !company_name || !address) {
    return ctx.body = { code: 400, message: '缺少必要的参数: name, password, email, phone, company_name, address', data: '' }
  }

  if(!isEmail(email)) {
    return ctx.body = { code: 400, message: '请输入正确的邮箱地址', data: '' }
  }

  if(!isPhone(phone)) {
    return ctx.body = { code: 400, message: '请输入正确的手机号码', data: '' }    
  }

  try {
    let curUsers = await User.find({}, '-password')

    const valida = curUsers.some((element, index) => {
      return element.email === email
    })

    if(valida) return ctx.body = { code: 402, message: '该邮箱已被注册', data: '' }    
    
    const encryptPass = await hash(password)

    let result = await User.create({ name, email, password: encryptPass, phone, company_name, address })
    result.password = undefined
    ctx.body = { code: 201, message: 'ok', data: result } 
  }
  catch(e) {
    logger.error('admin new User error', e)
  }
})

//获取单个用户
adminUser.get('/:id', async (ctx) => {
  try {
    let { id } = ctx.params
    let doc = await User.findById({ _id: id }, { password: 0 })
    ctx.body = { code: 200, message: 'ok', data: doc }
  } catch(e) {
    logger.error('admin get userById error', e)
  }
})

//更新用户
adminUser.put('/:id', async (ctx) => {
  try {
    let { id } = ctx.params
    let { name, password, email, phone, company_name, address } = ctx.request.body

    if(!isEmail(email)) {
      return ctx.body = { code: 400, message: '请输入正确的邮箱地址', data: '' }
    }

    if(!isPhone(phone)) {
      return ctx.body = { code: 400, message: '请输入正确的手机号码', data: '' }    
    }

    if(password) {
        let encrypt = await hash(password)
        const doc = await User.findByIdAndUpdate({ _id: id }, Object.assign({}, ctx.request.body, { password: encrypt }), { new: true })
        doc.password = undefined
        ctx.body = { code: 201, message: 'ok', data: doc }
    } else {
      const doc = await User.findByIdAndUpdate({ _id: id }, ctx.request.body, { new: true })
      doc.password = undefined
      ctx.body = { code: 201, message: 'ok', data: doc }     
    }
  } catch(e) {
    logger.error('admin update user error', e)
  }
})

//删除用户
adminUser.delete('/:id', async (ctx) => {
  try {
    let { id } = ctx.params
    let doc = await User.remove({ _id: id })
    ctx.body = { code: 201, message: 'ok', data: doc }
  } catch(e) {
    logger.error('admin delete user error', e)
  }
})


module.exports = adminUser