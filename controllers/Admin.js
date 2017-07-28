

import mongoose from 'mongoose'
import User from '../model/User'
import jwt from 'jsonwebtoken'
import { cert, initAdmins } from '../config'
import { hash } from '../utils/util'
import { busboys } from '../utils/upload'
import News from '../model/News'
import Bug from '../model/Bug'
import Order from '../model/Order'
import Device from '../model/Device'
import Category from '../model/Category'
import Auth from '../model/Auth'
import deleteFile from '../utils/deleteFile'
import Counter from '../model/Counter'
import Part from '../model/Part'



class Admin {

  //管理员登录
  static async session(ctx) {
    const { admin, password } = ctx.request.body
    if(!admin || !password)
      return ctx.body = { code: 400, message: '缺少必要的参数 admin, password', data: '' }
    const valid = initAdmins.some((item, index) => {
      return item.admin === admin && item.password === password
    })
    if(!valid)
      return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

    const token = jwt.sign({ admin, password }, cert)
    ctx.body = { code: 201, message: 'ok', data: token }
  }

  //新增用户
  static async newUser(ctx) {
    const { name, password, email, phone, company_name, address } = ctx.request.body

    if(!name || !password || !email || !phone || !company_name || !address) {
      return ctx.body = {
        code: 400,
        message: '缺少必要的参数 name, password, email, phone, company_name, address',
        data: ''
      }
    }

    const emailPat = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i
    if(!emailPat.test(email)) {
      return ctx.body = {
        code: 402,
        message: '请输入正确的邮箱地址',
        data: ''
      }
    }

    const phonePat = /^1[3|4|5|7|8][0-9]{9}$/
    if(!phonePat.test(phone)) {
      return ctx.body = {
        code: 402,
        message: '请输入正确的手机号码',
        data: ''
      }
    }

    const curUsers = await User.find({}, '-password')
    console.log(curUsers)

    const valida = curUsers.some((element, index) => {
      return element.email === email
    })

    if(valida) return ctx.body = { code: 402, message: '该邮箱已被注册', data: ''}    
    
    const encryptPass = await hash(password)

    let result = await User.create({ name, email, password: encryptPass, phone, company_name, address })
    result.password = undefined
    ctx.body = { code: 201, message: 'ok', data: result }   
    
  }

  //获取所有用户
  static async getUsers (ctx) {
    const { type } = ctx.query
    if(type === 'name') {
      let docs = await User.find({}, 'name')
      return ctx.body = { code: 200, message: 'ok', data: docs }
    }
    try {
      const result = await User.find({}, '-password')
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库时出错', data: e }
    }
  }

  //获取单个用户
  static async getUserById(ctx) {
    const userId = ctx.userId
    if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}
    try {
      const result = await User.findById(userId, '-password')
      if(!result) return ctx.body = { code: '404', message: '未找到该用户', data: result }
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库时出错', data: e }
    }
  }

  //更新单个用户
  static async UpdateUser(ctx) {
    const userId = ctx.userId
    const encryptPass = await hash(ctx.request.body.password)
    const bodyData = Object.assign({}, ctx.request.body, { password: encryptPass })

    if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}

    try {
      const result = await User.findOneAndUpdate({ _id: userId }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库时出错', data: e }
    }
  }

  //删除单个用户
  static async DeleteUser(ctx) {
    const userId = ctx.userId
    if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}
    try {
      const result = await User.remove({ _id: userId })
      ctx.body = { code: 201, message: 'ok', data: {} }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库时出错', data: e }
    }
  }

  //news images
  static async uploadImgWithNews(ctx) {
    const upload = await busboys (ctx)
    console.log(upload)
    if(upload.fieldname !== 'news')
      return ctx.body = { code: 400, message: '参数值错误, key: news', data: '' }
    if(!upload.success)
      return ctx.body = { code: 501, message: '上传文件失败', data: upload }
    ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }
  }

  //创建消息
  static async createNew(ctx) {
    let { title, abstract, content, published, images } = ctx.request.body
    if( !title || !abstract || !content || published === undefined || !images.length )
      return ctx.body = {
        code: 400, 
        message: '缺少必要的参数: title, abstract, content, published, images',
        data: ''
      }
    const author = ctx.request.decoded.admin
    const result = await News.create({ title, abstract, content, author, published, images })
    ctx.body = { code: 201, message: '创建成功', data: result }
  }

  //获取所有消息
  static async getNews(ctx) {
    const result = await News.find()
    ctx.body = { code: 200, message: '获取成功', data: result }
  }

  //更新消息
  static async updateNew(ctx) {
    const { id } = ctx.query
    let bodyData = ctx.request.body

    if(bodyData.published) {
      bodyData = Object.assign({}, bodyData, { publish_time: new Date() })
    }
    const result = await News.findOneAndUpdate({ _id: id }, bodyData, { new: true })

    if(bodyData.published === true) {
      return  ctx.body = { code: 201, message: '发布成功', data: result }
    }

    ctx.body = { code: 201, message: '更新成功', data: result }

  }

  static async deleteNew(ctx) {
    const { id } = ctx.query
    try {
      const singleNew = await News.find({ _id: id })

      singleNew.images.map((item, index) => {
        deleteFile(item, '/static/upload/')
      })
      
      const result = await News.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }

  static async getNewsById(ctx) {
    let { id } = ctx.query
    try {
      const result = await News.findById({ _id: id })
      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }

  //bugs-category

  static async createBugCate (ctx) {
    const { text } = ctx.request.body 
    if(!text)
      return ctx.body = { code: 400, message: '缺少必要的参数: text', data: '' }
    const cate = new Category({
      text: text,
    })
    const doc = await cate.save()
    ctx.body = { code: 201, message: '创建成功', data: doc }
  }

  static async getBugCates(ctx) {
    const result = await Category.find({}).sort('-sortIndex').exec()
    ctx.body = { code: 200, message: '获取成功', data: result}
  }

  static async deleteBugCate(ctx) {
    const id = ctx.categoryId
    console.log(id)
    const result = await Category.remove({ _id: id })
    ctx.body = { code: 201, message: '删除成功', data: {} }
  }

  static async topBugCates(ctx) {
    const { categoryId } = ctx.request.body
    const { seq } = await Counter.findByIdAndUpdate({ _id: 'categoryId'}, { $inc: {seq: 1} }, { new: true, upsert: true })
    const result = await Category.findByIdAndUpdate({ _id: categoryId }, { $set: { sortIndex: seq } }, { new: true } )
    ctx.body = { code: 201, message: '修改成功', data: result }
  }

  //新建BUG
  static async createBug(ctx) {
    let { title, category, content } = ctx.request.body
    if( !title || !category || !content )
      return ctx.body = { code: 400, message: '缺少必要的param: title, category, content', data: ''}

    try {
      const result = await Bug.create({ title, category, content })
      ctx.body = { code: 201, message: '创建成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 503, message: '数据库出错', data: e }
    }
  }

  static async updateBug(ctx) {
    let id = ctx.bugId
    let bodyData = ctx.request.body

    const result = await Bug.findOneAndUpdate({ _id: id }, bodyData, { new: true })
    ctx.body = { code: 201, message: '更新成功', data: result }
  }

  static async deleteBug(ctx) {
    let id = ctx.bugId
    try {
      const result = await Bug.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库出错', data: e }
    }
  }

  static async getBugs(ctx) {
    try {
      const result = await Bug.find({}, '-isSolved')
                              .populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库出错', data: e }
    }
  }

  static async getBug(ctx) {
    let id = ctx.bugId
    try {
      const result = await Bug.findById({ _id: id }, '-isSolved')
                              .populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据库出错', data: e }
    }
  }

  static async getOrders(ctx) {
    const orders = await Order.find({})
    .populate('user', 'name')

    ctx.body = { code: 200, message: '获取成功', data: orders }
  }

  static async getOrder(ctx) {
    const id = ctx.orderId
    const result = await Order.findById(id)
    ctx.body = { code: 200, message: '获取成功', data: result }
  }

  static async handleOrder(ctx) {
    const id = ctx.orderId
    const { advice } = ctx.request.body
    if(!id || !advice)
      return ctx.body = { code: 400, message: '缺少必要的参数：id, advice', data: '' }
    const result = await Order.findOneAndUpdate({ _id: id}, { $set: { advice: advice, isHanlded: true } }, { new: true } )
    if(!result)
      return ctx.body = { code: 500, message: 'server error', data: '' }
    ctx.body = { code: 201, message: '处理成功', data: result }
  }

  //devices

  static async uploadImgWithDevice(ctx) {
    const upload = await busboys (ctx)
    if(upload.fieldname !== 'device')
      return ctx.body = { code: 400, message: '参数值错误, key: device', data: '' }
    if(!upload.success)
      return ctx.body = { code: 501, message: '上传文件失败', data: upload }
    ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }
  }

  static async createDevice(ctx) {
    const { name, number, images, cc, pressure, combustible, description, address, timelines } = ctx.request.body
    if(!name || !number || !cc || !pressure || !combustible || !description || !address) {
      return ctx.body = { code: 400, message: '缺少必要的参数：name, number, cc, pressure, combustible, description, address', data: '' }
    }

    const location = []
    location.push({
      text: address,
      time: new Date()
    })

    const device = new Device({
      name,
      number,
      images,
      cc,
      pressure,
      combustible,
      description,
      location,
      timelines,
    })
    const result = await device.save()
    ctx.body = { code: 201, message: '创建成功', data: result }
  }

  static async getDevices(ctx) {
    const { type } = ctx.query

    if(type === 'name') {
      const docs = await Device.find({}, 'name')
      return ctx.body = { code: 200, message: '获取成功', data: docs }
    }

    // var result = await Device.aggregate([

    // ])
    var result = await Device.find({})

    // var newResult = result.map((item, index) => {
      // item.location 
      // return item
      // return Object.assign({}, item, { address: item.location[item.location.length - 1].text })
    // })

    ctx.body = { code: 200, message: '获取成功', data: result }
  }

  static async getDevice(ctx) {
    const deviceId = ctx.deviceId
    const doc = await Device.findById({_id: deviceId })
    ctx.body = { code: 200, message: '获取成功', data: doc }
  }

  static async updateDevice(ctx) {
    const deviceId = ctx.deviceId
    const updateBody = ctx.request.body
    const result = await Device.update({ _id: deviceId }, updateBody, { upsert: false })
    ctx.body = { code: 201, message: '更新成功', data: result }
  }

  static async updateDeviceLoaction(ctx) {
    const deviceId = ctx.deviceId
    const { address } = ctx.request.body
    const obj = {}
    obj.text = address
    obj.time = new Date()
    const result = await Device.findByIdAndUpdate({ _id: deviceId }, { $push : { 'location' : obj } }, { new: true , upsert: false })
    ctx.body = { code: 201, message: '更新成功', data: result }
  }

  static async addAuth(ctx) {
    
    const { userId, deviceId, canView, canMonitor } = ctx.request.body

    if( !userId || !deviceId || canView === undefined || canMonitor === undefined )
      return ctx.body = { code: 400, message: '缺少必要的参数 userId, deviceId, canView, canMonitor', data: '' }
  
    const result = await Auth.create({ 
      user: userId,
      device: deviceId,
      canView: canView,
      canMonitor: canMonitor
    })
    ctx.body = { code: 201, message: '创建成功', data: result }

    // Device.update({ _id: deviceId }, { $push: { canViews: userId } })
  }

  static async getAuths(ctx) {
    const result = await Auth.find({})
                .populate('user', 'name')
                .populate('device', 'name number')
    ctx.body = { code: 200, message: '获取成功', data: result }
  }

  static async getAuth(ctx) {
    const { authId } = ctx.query
    const result = await Auth.findOne({_id: authId})
                .populate('user', 'name')
                .populate('device', 'name number')
    ctx.body = { code: 200, message: '获取成功', data: result }
  }


  static async updateAuth(ctx) {
    const { authId } = ctx.query
    const updateBody = ctx.request.body

    const result = await Auth.findByIdAndUpdate({ _id: authId }, updateBody, { new: true })
    ctx.body = { code: 201, message: '更新成功', data: result }
  }

  static async getParts(ctx) {
    const docs = await Part.find({})
    ctx.body = { code: 200, message: 'ok', data: docs }
  }


}

export default Admin

