
const User = require('../model/User')
const News = require('../model/News')
const Bug = require('../model/Bug')
const Order = require('../model/Order')
const Device = require('../model/Device')
const Category = require('../model/Category')
const Auth = require('../model/Auth')
const Counter = require('../model/Counter')
const Part = require('../model/Part')
const Notice = require('../model/Notice')
const DevMoniter = require('../model/DevMoniter')
const jwt = require('jsonwebtoken')
const deleteFile = require('../utils/deleteFile')
const { busboys } = require('../utils/upload')
const uploadXLS = require('../utils/uploadXLS')
const formatXLS = require('../utils/formatXLS')
const { hash } = require('../utils/util')
const { cert, initAdmins } = require('../config')
const transforExcel = require('../utils/transforExcel')
const nodeExcel  = require('excel-export')
const Validate = require('../utils/Validate')
const logger = require('../utils/logger')
const myEmitter = require('../tcp/emitter')
const OSS = require('../utils/OSS')
const oss = new OSS()getMoniterByNumber


// deleteDevice
// Create
// console
class Admin {

  //管理员登录
  static async session(ctx) {

    try {
      const { admin, password } = ctx.request.body
      if(!admin || !password)
        return ctx.body = { code: 400, message: '缺少必要的参数 admin, password', data: '' }
      
      const valid = initAdmins.some((item, index) => {
        return item.admin === admin && item.password === password
      })

      if(!valid)
        return ctx.body = { code: 403, message: '用户名或密码错误', data: '' }

      const token = jwt.sign({ admin, password }, cert, { expiresIn: '7d' })
      ctx.body = { code: 201, message: 'ok', data: token }
    } catch(e) {
      logger.error('管理员登录失败:', e)
    }
  }

  //新增用户
  static async newUser(ctx) {
    try {
      const { name, password, email, phone, company_name, address } = ctx.request.body

      const val = Validate.ifLackPara({ name, password, email, phone, company_name, address })

      if(!val.result) {
        return ctx.body = {
          code: 400,
          message: val.message,
          data: ''
        }
      }

      if(!Validate.isEmail(email)) {
        return ctx.body = {
          code: 402,
          message: '请输入正确的邮箱地址',
          data: ''
        }
      }

      if(!Validate.isPhone(phone)) {
        return ctx.body = {
          code: 402,
          message: '请输入正确的手机号码',
          data: ''
        }
      }

      const curUsers = await User.find({}, '-password')

      const valida = curUsers.some((element, index) => {
        return element.email === email
      })

      if(valida) return ctx.body = { code: 402, message: '该邮箱已被注册', data: ''}    
      
      const encryptPass = await hash(password)

      let result = await User.create({ name, email, password: encryptPass, phone, company_name, address })
      result.password = undefined
      ctx.body = { code: 201, message: 'ok', data: result } 
    } catch(e) {
      logger.error('新增用户失败' , e)
    }
  }

  //获取所有用户
  static async getUsers (ctx) {
    try {
      const { type } = ctx.query
      if(type === 'name') {
        let docs = await User.find({}, { name: 1, email: 1 }).sort('-createdAt')
        return ctx.body = { code: 200, message: 'ok', data: docs }
      }
      const result = await User.find({}, '-password').sort('-createdAt')
      ctx.body = { code: 200, message: 'ok', data: result }
    } 
    catch(e) {
      logger.error('admin get all users error', e)
    }
  }

  //获取单个用户
  static async getUserById(ctx) {
    try {
      const userId = ctx.userId
      if(!userId)
        return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}

      const result = await User.findById(userId, '-password')

      if(!result)
        return ctx.body = { code: '404', message: '未找到该用户', data: result }

      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('admin get user error', e)
    }
  }

  //更新单个用户
  static async UpdateUser(ctx) {

    try {
      const userId = ctx.userId
      const encryptPass = await hash(ctx.request.body.password)
      const bodyData = Object.assign({}, ctx.request.body, { password: encryptPass })

      if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}

      const { phone } = bodyData
      if( phone && !Validate.isPhone(phone) ) {
        return ctx.body = { code: 405, message: '请输入正确的手机格式', data: '' }
      }

      const result = await User.findOneAndUpdate({ _id: userId }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('admin update user error', e)
    }
  }

  //删除单个用户
  static async DeleteUser(ctx) {

    try {
      const userId = ctx.userId
      if(!userId)
        return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}
      const result = await User.remove({ _id: userId })
      ctx.body = { code: 201, message: 'ok', data: {} }
    }
    catch(e) {
      logger.error('admin delete user error', e)
    }
  }

  //news images
  static async uploadImgWithNews(ctx) {
    try {
      const result = await oss.uploadMulter('news', ctx)
      if(result.key)
        return ctx.body = { code: 400, message: `参数值错误, key: ${result.key}`, data: '' }
      else if(result.pubUrl)
        return ctx.body = { code: 201, message: '上传成功', data: { url: result.pubUrl } }   
      else ctx.body = { code: 501, message: '上传文件失败', data: result }
    } catch(e) {
      logger.error('admin upload news image error', e)
    }
  }

  //创建消息
  static async createNew(ctx) {
    try {
      let { title, abstract, content, published, images } = ctx.request.body
      if( !title || !abstract || !content || !images.length )
        return ctx.body = {
          code: 400, 
          message: '缺少必要的参数: title, abstract, content, published, images',
          data: ''
        }
      const author = ctx.request.decoded.admin
      const publish_time = published ? new Date() : null

      const news = new News({
        title,
        abstract,
        content,
        images,
        author,
        publish_time,
        published
      })
      const result = await news.save()
      ctx.body = { code: 201, message: '创建成功', data: result }
    } catch (e) {
      logger.error('admin create news error')
    }
  }

  //获取所有消息
  static async getNews(ctx) {
    try {
      const result = await News.find().sort('-updatedAt')
      ctx.body = { code: 200, message: '获取成功', data: result }
    } catch(e) {
      logger.error('admin get all news error', e)
    }
  }

  //更新消息
  static async updateNew(ctx) {

    try {
      const { id } = ctx.query
      let bodyData = ctx.request.body

      if(bodyData.published) {
        bodyData = Object.assign({}, bodyData, { publish_time: new Date() })
      }
      const result = await News.findOneAndUpdate({ _id: id }, bodyData, { new: true })

      if(bodyData.publidshed === true) {
        return  ctx.body = { code: 201, message: '发布成功', data: result }
      }

      ctx.body = { code: 201, message: '更新成功', data: result }
    } catch(e) {
      logger.error('admin update new error', e)
    }

  }

  static async deleteNew(ctx) {
    try {
      const { id } = ctx.query
      const singleNew = await News.findOne({ _id: id })

      singleNew.images.map(async (item, index) => {
        const ossResult = await oss.delete(item.url)
        if(!ossResult.del) {
          try {
            await deleteFile(item.url, 'static/upload/')
          } catch(e) {
            // logger.error(e)
          }
        }
      })
      
      const result = await News.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      logger.error('admin delete new error', e)
    }
  }

  static async getNewsById(ctx) {
    try {
      let { id } = ctx.query
      const result = await News.findById({ _id: id })
      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      logger.error('admin get new error', e)
    }
  }

  //bugs-category

  static async createBugCate (ctx) {
    try {
      const { text } = ctx.request.body 
      if(!text)
        return ctx.body = { code: 400, message: '缺少必要的参数: text', data: '' }
      const cate = new Category({
        text: text,
      })
      const doc = await cate.save()
      ctx.body = { code: 201, message: '创建成功', data: doc }
    } catch(e) {
      logger.error('admin create bug category error', e)
    }
  }

  static async getBugCates(ctx) {
    try {
      const result = await Category.find({}).sort('-sortIndex').exec()
      ctx.body = { code: 200, message: '获取成功', data: result}
    } catch(e) {
      logger.error('admin get bug category error', e)
    }
  }

  static async deleteBugCate(ctx) {
    try {
      const id = ctx.categoryId
      const result = await Category.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    } catch(e) {
      logger.error('admin delete bug category error', e)
    }
  }

  static async topBugCates(ctx) {
    try {
      const { categoryId } = ctx.request.body
      const { seq } = await Counter.findByIdAndUpdate({ _id: 'categoryId'}, { $inc: {seq: 1} }, { new: true, upsert: true })
      const result = await Category.findByIdAndUpdate({ _id: categoryId }, { $set: { sortIndex: seq } }, { new: true } )
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin top bug category error', e)
    }
  }

  //新建BUG
  static async createBug(ctx) {
    try {
      let { title, category, content } = ctx.request.body
      if( !title || !category || !content )
        return ctx.body = { code: 400, message: '缺少必要的param: title, category, content', data: ''}

      const result = await Bug.create({ title, category, content })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('admin create bug error', e)
    }
  }

  static async updateBug(ctx) {
    try {
      let id = ctx.bugId
      let bodyData = ctx.request.body

      const result = await Bug.findOneAndUpdate({ _id: id }, bodyData, { new: true })
      ctx.body = { code: 201, message: '更新成功', data: result }
    } catch(e) {
      logger.error('admin update bug error', e)
    }
  }

  static async deleteBug(ctx) {
    try {
      let id = ctx.bugId
      const result = await Bug.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      logger.error('admin delete bug error', e)
    }
  }

  static async getBugs(ctx) {
    try {
      const result = await Bug.find({}, '-isSolved')
                              .sort('-updatedAt')
                              .populate('category', 'text sortIndex')

      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      logger.error('admin get bugs error', e)
    }
  }

  static async uploadImgWithBug (ctx) {
    try {
      const result = await oss.uploadMulter('bugs', ctx)
      if(result.key)
        return ctx.body = { code: 400, message: `参数值错误, key: ${result.key}`, data: '' }
      else if(result.pubUrl)
        return ctx.body = { code: 201, message: '上传成功', data: { url: result.pubUrl } }   
      else ctx.body = { code: 501, message: '上传文件失败', data: result }
    } catch(e) {
      logger.error('admin upload image with bug error', e)
    }
  }

  static async getBug(ctx) {
    try {
      let id = ctx.bugId
      const result = await Bug.findById({ _id: id }, '-isSolved')
                              .populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: '获取成功', data: result }
    }
    catch(e) {
      logger.error('admin get bug error', e)
    }
  }

  static async getOrders(ctx) {
    try {
      const orders = await Order.find({}).sort('-createdAt')
      ctx.body = { code: 200, message: 'ok', data: orders }
    } catch(e) {
      logger.error('admin get orders error', e)
    }
  }

  static async getOrder(ctx) {
    try {
      const id = ctx.orderId
      const result = await Order.findById(id)
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin get order error', e)
    }
  }

  static async deleteOrder(ctx) {
    try {
      const id = ctx.orderId
      const result = await Order.findByIdAndRemove({ _id: id })
      ctx.body = { code: 201, message: 'ok', data: {} }
    } catch(e) {
      logger.error('admin delete order error', e)
    }
  }

  static async handleOrder(ctx) {
    try {
      const id = ctx.orderId
      const { advice } = ctx.request.body

      if(!id || !advice)
        return ctx.body = { code: 400, message: '缺少必要的参数：id, advice', data: '' }
      
      const result = await Order.findOneAndUpdate({ _id: id }, { $set: { advice: advice, isHanlded: true } }, { new: true } )
    
      const notice = {
        types: 'order',
        des: result.title,
        status: result.isHanlded,
        readed: false,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
        order: {
          id: result._id,
          images: result.images || '',
          content: result.content,
          feedback: result.advice,
          time: new Date()
        }
      }

      const noticeResult = await Notice.findOneAndUpdate({ 'order.id' : result._id }, notice, { new: true, upsert: true })

      myEmitter.emit('orderNotice', noticeResult)

      if(!result)
        return ctx.body = { code: 500, message: 'server error', data: '' }

      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin handleOrder error', e)
    }

  }

  //devices

  static async getExcel(ctx) {

    let { startTime, endTime } = ctx.query

    if(!startTime || !endTime)
      return ctx.body = { code: 400, message: '缺少必要的参数 startTime, endTime', data: ''}
    
    const devices = await Device.aggregate([
      { $unwind: "$timelines" },
      { $project: 
        { 
          "linestime" : "$timelines.line_time",
          "linestype" : "$timelines.line_type",
          "linesdes" : "$timelines.line_des",
          "name" : 1,
          "number": 1,
          "_id" : "$linestime",
          "address": "$address",
          "cc": "$cc",
          "pressure": "$pressure",
          "combustible": "$combustible",
       }
     },
     { $match: { linestime: { $gte: new Date(startTime), $lte: new Date(endTime) } } },
     { $sort: { linestime: 1 } }
    ])

    console.log(devices)

    const { keyArray , valueArray } = transforExcel(devices)
    var conf = {}
    conf.stylesXmlFile = 'styles.xml'
    conf.name = 'mysheet'
    conf.cols = keyArray
    conf.rows = valueArray

    const time = new Date()
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.attachment(`${time}.xlsx`)

    const result = new Buffer(nodeExcel.execute(conf), 'binary'); 

    ctx.body = result
  }

  static async uploadImgWithDevice(ctx) {
    try {
      const result = await oss.uploadMulter('device', ctx)
      if(result.key)
        return ctx.body = { code: 400, message: `参数值错误, key: ${result.key}`, data: '' }
      else if(result.pubUrl)
        return ctx.body = { code: 201, message: '上传成功', data: { url: result.pubUrl } }   
      else ctx.body = { code: 501, message: '上传文件失败', data: result }
    } catch(e) {
      logger.error('admin uploadImgWithDevice error', e)
    }
    // try {
    //   const upload = await busboys (ctx)
    //   if(upload.fieldname !== 'device')
    //     return ctx.body = { code: 400, message: '参数值错误, key: device', data: '' }
    //   if(!upload.success)
    //     return ctx.body = { code: 501, message: '上传文件失败', data: upload }
    //   ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }
    // } catch(e) {
    //   logger.error('admin uploadImgWithDevice error', e)
    // }
  }

  static async createDevice(ctx) {
    try {
      const { name, number, images, cc, pressure, combustible, classify, description, address, timelines, remark } = ctx.request.body
      if(!name || !number || !cc || !pressure || !combustible || !description || !address ||!classify) {
        return ctx.body = { code: 400, message: '缺少必要的参数：name, number, cc, pressure, combustible, description, address, classify', data: '' }
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
        address,
        remark,
        classify
      })
      const result = await device.save()
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin create device error', e)
    }
  }

  static async getDevices(ctx) {

    try {
      const { type } = ctx.query

      //获取设备名称
      if(type === 'name') {
        const docs = await Device.find({}, 'name')
        return ctx.body = { code: 200, message: 'ok', data: docs }
      }

      var result = await Device.find({}).sort('-createdAt')

      const addIncharge = (result) => {
        const promise = result.map(async (item, index) => {
            var incharges = await Auth.find({ device: item._id }).populate('user', 'name')
            var user = []
            incharges.map((auth, i) => {
              if(auth.user && auth.user.name) user.push(auth.user.name)
            })
            return Object.assign({}, item._doc, { incharges: user })
        })
        return Promise.all(promise)
      }

      result = await addIncharge(result)

      result = result.map((item, index) => {
        item.location = item.location.sort((a, b) => {
          return new Date(b.time).getTime() - new Date(a.time).getTime()
        })
        return item
      })

      ctx.body = { code: 200, message: 'ok', data: result }
    } catch (e) {
      logger.error('admin get devices error', e)
    }
  }

  static async getDevice(ctx) {
    try {

      var deviceId = ctx.deviceId
      var doc = await Device.findById({ _id: deviceId })

      doc.timelines = doc.timelines.sort((a, b) => {
        return new Date(a.line_time).getTime() - new Date(b.line_time).getTime()
      })

      ctx.body = { code: 200, message: 'ok', data: doc }
    } catch (e) {
      logger.error('admin get device error', e)
    }
  }

  static async updateDevice(ctx) {
    try {
      const deviceId = ctx.deviceId
      const updateBody = ctx.request.body
      const result = await Device.update({ _id: deviceId }, updateBody, { upsert: false })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin update device error', e)
    }
  }

  static async deleteDevice(ctx) {
    try {
      const deviceId = ctx.deviceId
      const result = await Device.remove({ _id: deviceId })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin delete Device error', e)
    }
  }

  static async updateDeviceLoaction(ctx) {

    try {
      const deviceId = ctx.deviceId
      const { address } = ctx.request.body

      const obj = {}
      obj.text = address
      obj.time = new Date()

      const result = await Device.findByIdAndUpdate({ _id: deviceId }, { 
        $push : { 'location' : obj },
        $set : { 'address' : address }
      }, 
      { new: true , upsert: false })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin updateDeviceLoaction error', e)
    }
  }

  static async deleteTimeLine(ctx) {
    try {
      const deviceId = ctx.deviceId
      const { lineId } = ctx.query
      if(!lineId)
        return ctx.body = { code: 400, message: '缺少必要的参数 lineId', data: '' }
      const result = await Device.updateOne(
          { _id: deviceId },
          { $pull : { timelines: { _id : lineId } } }
        )
      ctx.body = { code: 201, message: '删除成功', data: result }
    } catch(e) {
      logger.error('admin deleteTimeLine error', e)
    }
  }

  static async updateTimeLine(ctx) {
    try {

      const deviceId = ctx.deviceId
      const { lineId, line_type, line_des, line_time } = ctx.request.body
      if( !lineId || !line_type || !line_des || !line_time) {
        return ctx.body = { code: 200, message: '缺少必要的参数 lineId, lien_type, lien_des, line_time', data: '' }
      }
      const result = await Device.update(
          { _id: deviceId, "timelines._id" : lineId },
          { $set: { 
              "timelines.$.line_type" : line_type,
              "timelines.$.line_des"  : line_des,
              "timelines.$.line_time" : line_time 
            }
          }
        )
      ctx.body = { code: 201, message: '更新成功', data: result }
    } catch(e) {
      logger.error('admin update timelines error')
    }

  }

  static async addAuth(ctx) {
    
    try {
      const { userId, deviceId, canView, canMonitor } = ctx.request.body
      if( !userId || !deviceId || canView === undefined || canMonitor === undefined )
        return ctx.body = { code: 400, message: '缺少必要的参数 userId, deviceId, canView, canMonitor', data: '' }
      
      const currentAuth = await Auth.find({})

      const isReap = currentAuth.some((item, index) => {
        return item.user == userId && item.device == deviceId
      })

      if(isReap) {
        return ctx.body = { code: 403, message: '已创建该用户和该设备的权限', data: ''}
      }

      const result = await Auth.create({
        user: userId,
        device: deviceId,
        canView: canView,
        canMonitor: canMonitor
      })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('addAuth error', e)
    }
  }

  static async getAuths(ctx) {
    try {
      const result = await Auth.find({})
                  .populate('user', 'name')
                  .populate('device', 'name number')
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin get Auths error')
    }
  }

  static async getAuth(ctx) {
    try {
      const { authId } = ctx.query
      const result = await Auth.findOne({_id: authId})
                  .populate('user', 'name')
                  .populate('device', 'name number')
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin get Auth error')
    }
  }

  static async deleteAuth(ctx) {
    try {
    const { authId } = ctx.query
      const result = await Auth.remove({ _id: authId })
      ctx.body = { code: 201, message: 'ok', data: {} }
    }
    catch(e) {
      logger.error('admin delete Auth error', e)
    }
  }


  static async updateAuth(ctx) {
    try {
      const { authId } = ctx.query
      const updateBody = ctx.request.body

      const result = await Auth.findByIdAndUpdate({ _id: authId }, updateBody, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('admin update Auth error', e)
    }
  }

  //parts

  static async uploadPartFile(ctx) {

    try {
      const upload = await uploadXLS(ctx, { fileType: 'album' })
      const data = formatXLS(upload.path)
      const existParts = await Part.find({}, { _id: 0, code: 1, name: 1, model: 1, unit: 1 })
      existParts.map((item)=> {
        for(var i = 0; i < data.length; i++) {
          if(JSON.stringify(data[i]) === JSON.stringify(item)) {
            data.splice(i, 1)
            i -= 1
          }
        }
      })
      const result = await Part.insertMany(data)
      ctx.body = { code: 200, message: 'ok', data: result }

    } catch(e) {
      if(e.success === false)
        ctx.body = { code: 503, message: e.message, data: '' }
      logger.error(e)
    }

    // if(upload.fieldname !== 'part')
      // return ctx.body = { code: 400, message: '参数值错误, key: part', data: '' }

    // if(!upload.success)
      // return ctx.body = { code: 501, message: '上传文件失败', data: upload }

    // ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }   

  }

  static async getParts(ctx) {
    try {
    const docs = await Part.find({})
      ctx.body = { code: 200, message: 'ok', data: docs }
    } catch(e) {
      logger.error('admin get parts error', e)
    }
  }

  static async setPartRemark(ctx) {

    try {

      const { deviceId, remark } = ctx.request.body
      const { partId } = ctx.query

      const device = await Device.findOne({ _id: deviceId }, { name:1, number: 1})
      const { name, number } = device

      const result = await Part.findByIdAndUpdate(
            { _id: partId },
            { $set: { deviceCode: number, deviceName: name, remark: remark } },
            { new: true }
          )
      ctx.body = { code: 201, message: '修改成功', data: result }
    } catch(e) {
      logger.error('admin setPartRemark error', e)
    }
  }

  static async getMoniterByNumber(ctx) {

    let { number } = ctx.request.query
    
    let doc = await Device.findOne({ number: number }, {name: 1, number: 1, data: 1, ts: 1, createdAt: 1, updatedAt: 1})

    ctx.body = { code: 200, message: 'ok', data: doc }
  }

}

module.exports = Admin

