
import User from '../model/User'
import News from '../model/News'
import Bug from '../model/Bug'
import Order from '../model/Order'
import Hot from '../model/Hot'
import Device from '../model/Device'
import Auth from '../model/Auth'
import Notice from '../model/Notice'
import Category from '../model/Category'
import jwt from 'jsonwebtoken'
import { cert } from '../config'
import { busboys } from '../utils/upload'
import { hash } from '../utils/util'
import bcrypt from 'bcrypt'
import transforExcel from '../utils/transforExcel'
import nodeExcel  from 'excel-export'

class App {

  static async Index (ctx) {
    ctx.body = 'this is api of drm app'
  }

  //登录
  static async session (ctx) {
    const { email, password } = ctx.request.body
    if(!email || !password)
      return ctx.body = { code: 400, message: '缺少必要的参数 email, password', data: '' }

    const result = await User.findOne({ email })

    if(!result)
      return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

    const isvalid = await bcrypt.compare(password, result.password)

    if(!isvalid)
      return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

    const token = jwt.sign({ id: result._id }, cert, { expiresIn: '7d' } )
    ctx.body = { code: 201, message: 'ok', data: token }
  }

  //获取用户信息
  static async getUserInfo(ctx) {
    const { id } = ctx.request.decoded 
    const result = await User.findById(id, '-password')
    if(!result)
      return ctx.body = { code: 404, message: '未找到该用户', data: result }
    ctx.body = { code: 200, message: 'ok', data: result }
  }

  //修改用户信息
  static async UpdateUser(ctx) {

    const { id } = ctx.request.decoded
    const bodyData = ctx.request.body

    if(ctx.request.body.password) {
      return ctx.body = { code: 404, message: '不允许通过此API修改密码', data: ''}
    }

    try {
      const result = await User.findOneAndUpdate({ _id: id }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }

  //更改用户密码
  static async UpdateUserPassword(ctx) {
    const { password, newPass, confirmPass } = ctx.request.body

    if(!password || !newPass || !confirmPass)
      return ctx.body = { code: 400, message: '缺少必要的参数 password, newPass, confirmPass', data: ''}


    if(newPass !== confirmPass)
      return ctx.body = { code: 403, message: '两次新密码不相同,不允许修改', data: '' }

    const { id } = ctx.request.decoded
    const userinfo = await User.findById({ _id: id })
    
    const isValid = await bcrypt.compare(password, userinfo.password)
    if(!isValid)
      return ctx.body = { code: 410, message: '密码不正确，不允许修改', data: '' }

    const encryptPass = await hash(newPass)

    const result = await User.findOneAndUpdate({ _id: id }, { password: encryptPass }, { new: true }) 
    if(!result)
      ctx.body = { code: 500, message: '修改出错', data: '' }
    result.password = undefined
    ctx.body = { code: 201, message: '修改成功', data: result }
  }

  //获取所有信息
  static async getNews(ctx) {
    try {
      const result = await News.find({ published: true })
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }

  //获取单个信息
  static async getNewsById(ctx) {
    let { id } = ctx.query
    try {
      const result = await News.findById({ _id: id })
      ctx.body = { code: 201, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }


  //获取所有 故障+搜索
  static async getBugs(ctx) {
    const { type, search } = ctx.query

    if(type === 'submit') {
      // hots
      // 有这个词就权重加1,没有这个词就创建。
      const hot = await Hot.findOneAndUpdate({ text: search }, { $inc: { weights: 1 }}, { new: true, upsert: true })
      ctx.body = { code: 200, message: 'ok', data: hot }
    }

    else if(type === 'onchange') {
      const titleArr = await Bug.find({title: new RegExp(search, 'i')}).limit(5).exec()
      const contentArr = await Bug.find({content: new RegExp(search, 'i')}).limit(5).exec()
      ctx.body = { code: 200, message: 'ok', data: titleArr.concat(contentArr) }
    }

    else {
      let result = await Bug.find({}).populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: 'ok', data: result }      
    }
  }

  //获取单个故障
  static async getBug(ctx) {

    let { id } = ctx.query

    try {
      const result = await Bug.findById({ _id: id }).populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '操作数据时出错', data: e }
    }
  }

  static async getBugsCate(ctx) {
    const result = await Category.find({}).sort('-sortIndex')
    ctx.body = { code: 200, message: 'ok', data: result }
  }


  static async getHots(ctx) {
    const hots = await Hot.find({}).sort('-weights').limit(10)
    ctx.body = { code: 200, message: 'ok', data: hots }
  }


  //创建工单
  static async createOrder(ctx) {
    let { category, title, content } = ctx.request.body
    if(!category || !title || !content ) {
      return ctx.body = { code: 401, message: '缺少必要的参数params: title, category, content', data: '' }
    }
    let { id } = ctx.request.decoded
    let order = await Order.create({ title, content, category, user: id })
    ctx.body = { code: 201, message: 'ok', data: order }
  }

  //获取工单
  static async getOrders(ctx) {
    let result = await Order.find()
    // .populate('user', 'name email')
    // .populate({ path: 'bug', select: 'category ', })

    ctx.body = { code: 200, message: 'ok', data: result }
  }

  static async getLastLocation(ctx) {
    const locations = await Device.aggregate([
      { $unwind: "$location"},
      { $project: { text: '$location.text', time: '$location.time'},  },
      { $limit: 5 },
      { $sort: { time: -1 } }
    ])
    ctx.body = { code: 200, message: 'ok', data: locations }
  }

  static async getDevices(ctx) {
    
    const { createTime, type, value, cc, pressure, combustible, address } = ctx.request.query
    // var devices;

    //按时间排序
    if(createTime == "desc" || createTime == "asc") {
      const devices = await Device.find().sort({ createdAt: createTime })
      return ctx.body = { code: 200, message: 'ok', data: devices }
    }

    //
    else if(type && value) {
      const find = {}
      find[type] = value
      const devices = await Device.find( find )
      return ctx.body = { code: 200, message: 'ok', data: devices }
    }

    //
    else if(cc || pressure || combustible || address) {
      const obj = { cc, pressure, combustible, address }
      for ( var key in obj) {
        if (obj[key] == 'null')
          delete obj[key]
      }

      const devices = await Device.find(obj)
      return ctx.body = { code: 200, message: 'ok', data: devices }
    }

    else {
      const devices = await Device.find({})
      ctx.body = { code: 200, message: 'ok', data: devices }
    }

  }

  static async getDevice(ctx) {
    const { id } = ctx.request.decoded
    const { deviceId, start, end } = ctx.query
    console.log(id, deviceId, start, end)

    const matchArr = await Auth.find( { user: id, device: deviceId } )

    console.log(matchArr)

    if(!matchArr.length) {
      return ctx.body = { code: 503, message: 'you has no authority to watch this device', data: ''}      
    }

    const canView = matchArr.some((item, index) => {
      return Boolean(item.canView) == true
    })

    const canMonitor = matchArr.some((item, index) => {
      return Boolean(item.canMonitor) == true
    })

    if(!canView)
      return ctx.body = { code: 503, message: 'you has no authority to watch this device', data: ''}

    var doc;
    if(start && end) {
      doc = await Device.find({_id: deviceId }).where('timelines.time').gte(start).lte(end)
    }
    else 
      doc = await Device.find({_id: deviceId })
    ctx.body = { code: 200, message: 'ok', data: doc }
  }

  static async updateDeviceRemark(ctx) {
    const { deviceId, remark } = ctx.request.body
    const result = await Device.findByIdAndUpdate({ _id: deviceId }, { remark }, { new: true })
    ctx.body = { code: 201, message: 'ok', data: result }
  }

  static async addDeviceTimeline(ctx) {
    const { deviceId, line_type, line_time, line_des } = ctx.request.body
    const result = await Device.findByIdAndUpdate({ _id : deviceId },
                                  { $push : { timelines: { line_type, line_time, line_des }}},
                                  { new: true }
                                )
    ctx.body = { code: 201, message: 'ok', data: result }
  }

  static async addDeviceImages(ctx) {
    const { deviceId } = ctx.query
    const upload = await busboys (ctx)
    if(upload.fieldname !== 'devices') {
      return ctx.body = { code: 400, message: '参数值错误, key: devices', data: '' }
    }
    const result = await Device.findByIdAndUpdate({ _id: deviceId },
                                 { $push: { images: { url: upload.file }}},
                                 { new: true }
                                )
    ctx.body = { code: 201, message: 'ok', data: result }
  }

  static async getNotices(ctx) {
    const docs = await Notice.find({})
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getOneNotice(ctx) {
    const { id } = ctx.query
    const doc = await Notice.findById({ _id: id })
    ctx.body = { code: 200, message: 'ok', data: doc }
  }

  static async setAllRead(ctx) {
    try {
      const docs = await Notice.updateMany({}, { readed: true })
      ctx.body = { code: 201, message: 'ok', data: docs }
    } catch(e) {
      console.log('notice: setAllread error:', e)
    }
  }

  static async setOneRead(ctx) {
    const { id } = ctx.request.body
    try {
      const docs = await Notice.update({_id: id}, { readed: true })
    } catch(e) {
      console.log('notice: setOneRead error:', e)
    }
  }

}

export default App