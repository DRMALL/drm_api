
const User = require('../model/User')
const News = require('../model/News')
const Bug = require('../model/Bug')
const Order = require('../model/Order')
const Hot = require('../model/Hot')
const Device = require('../model/Device')
const Auth = require('../model/Auth')
const Notice = require('../model/Notice')
const Category = require('../model/Category')
const TimeLine = require('../model/TimeLine')
const CCSort = require('../model/CCSort')
const PreSort = require('../model/PreSort')
const FuelSort = require('../model/FuelSort')
const DevMoniter = require('../model/DevMoniter')
const Part = require('../model/Part')
const DataGraph = require('../model/DataGraph')
const jwt = require('jsonwebtoken')
const { cert } = require('../config')
const { busboys } = require('../utils/upload')
const { hash } = require('../utils/util')
const bcrypt = require('bcrypt')
const transforExcel = require('../utils/transforExcel')
const nodeExcel  = require('excel-export')
const { isPhone } = require('../utils/Validate')
const { stripTags } = require('../utils/util')
const deleteFile = require('../utils/deleteFile')
const quotaDic = require('../utils/quotaDic')
const OSS = require('../utils/OSS')
const oss = new OSS()

const logger = require('../utils/logger')

class App {

  static async Index (ctx) {

  }

  //登录
  static async session (ctx) {
    try {
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
    } catch(e) {
      logger.error('app session error', e)
    }
  }

  //获取用户信息
  static async getUserInfo(ctx) {
    try {
      const { id } = ctx.request.decoded 
      const result = await User.findById(id, '-password')
      if(!result)
        return ctx.body = { code: 404, message: '未找到该用户', data: result }
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('app getUserInfo error', e)
    }
  }

  //修改用户信息
  static async UpdateUser(ctx) {
    try {

      const { id } = ctx.request.decoded
      const bodyData = ctx.request.body

      if(ctx.request.body.password) {
        return ctx.body = { code: 404, message: '不允许通过此API修改密码', data: ''}
      }

      const { phone } = bodyData
      if( phone && !isPhone(phone) ) {
        return ctx.body = { code: 402, message: '请输入正确的手机号码' , data: '' }
      }

      const result = await User.findOneAndUpdate({ _id: id }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }

    }
    catch(e) {
      logger.error('app updateUser error', e)
    }
  }

  //更改用户密码
  static async UpdateUserPassword(ctx) {
    try {
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
    } catch(e) {
      logger.error('app UpdateUserPassword error', e)
    }
  }

  //获取所有信息
  static async getNews(ctx) {
    try {
      const result = await News.find({ published: true }).sort('-updatedAt')
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('app getNews error', e)
    }
  }

  //获取单个信息
  static async getNewsById(ctx) {
    try {
      let { id } = ctx.query
      const result = await News.findById({ _id: id })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('getNewsById error', e)
    }
  }


  //获取所有 故障+搜索
  static async getBugs(ctx) {
    try {
      const { type, search } = ctx.query

      if(type === 'submit') {
        // hots
        // 有这个词就权重加1,没有这个词就创建。
        if(search) {
          const hot = await Hot.findOneAndUpdate({ type: 'bug', text: search }, { $inc: { weights: 1 }}, { new: true, upsert: true })
          return ctx.body = { code: 200, message: 'ok', data: hot }
        }
      }

      else if(type === 'onchange') {

        let result = await Bug.find(
          { "$or" : [{ content: new RegExp(search, 'i') }, { title:  new RegExp(search, 'i') }] }
        )

        result = result.map((item, index) => {
          item.content = stripTags(item.content)
          return item
        })

        return ctx.body = { code: 200, message: 'ok', data: result }
      }

      else {
        let result = await Bug.find({}).populate('category', 'text sortIndex')
        ctx.body = { code: 200, message: 'ok', data: result }      
      }

    } catch(e) {
      logger.error('get bugs error', e)
    }
  }

  //获取单个故障
  static async getBug(ctx) {
    try {
      let { id } = ctx.query
      const result = await Bug.findById({ _id: id }).populate('category', 'text sortIndex')
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      logger.error('app getBug error', e)
    }
  }

  static async getBugsCate(ctx) {
    try {
      const result = await Category.find({}).sort('-sortIndex')
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('app getBugs error', e)
    }
  }


  static async getHots(ctx) {
    try {
      const hots = await Hot.find({ type: 'bug' }).sort('-weights').limit(10)
      ctx.body = { code: 200, message: 'ok', data: hots }
    } catch(e) {
      logger.error('app getHots error', e)
    }
  }


  //创建工单
  static async createOrder(ctx) {
    try {
      let { category, title, content, images } = ctx.request.body
      if(!category || !title || !content ) {
        return ctx.body = { code: 401, message: '缺少必要的参数params: title, category, content', data: '' }
      }
      let { id } = ctx.request.decoded
      let user = await User.findOne({_id: id})
      let order = new Order({
        title,
        content,
        category,
        images,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      })
      let result = await order.save()

      const notice = {
        types: 'order',
        des: result.title,
        status: false,
        readed: false,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        order: {
          id: result._id,
          images: result.images || '',
          content: result.content,
          feedback: null,
          time: new Date()
        }
      }

      const noticeResult = await Notice.create(notice)

      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('app createOrder error', e)
    }
  }

  //获取工单
  static async getOrders(ctx) {
    try {
      let result = await Order.find()
      ctx.body = { code: 200, message: 'ok', data: result }
    } catch(e) {
      logger.error('app getOrders error', e)
    }
  }

  static async getLastLocation(ctx) {

    const { id } = ctx.request.decoded

    const matchArr = await Auth.find({ user: id, canView: true })
    var deviceArr = []

    matchArr.map((item, index) => {
      deviceArr.push(item.device)
    })

    const devices = await Device.find({ _id: { $in: deviceArr } })
    var result = []

    devices.map((item, index) => {
      result.push({ text: item.address })
    })

    ctx.body = { code: 200, message: 'ok', data: result }

  }

  // static async getLastLocation(ctx) {
  //   try {
  //     const locations = await Device.aggregate([
  //       { $project: { "location" : "$location" , "_id" : 0 } },
  //       { $unwind: "$location" },
  //       { $project: { _id: '$location._id', text: '$location.text', time: '$location.time'},  },
  //       { $sort: { time: -1 } },
  //     ])

  //     var new_locations = uniqeArr(locations)

  //     function uniqeArr(arr) {
  //       var hello = []
  //       var isRepeated = false
  //       for(let i = 0; i < arr.length; i++) {
  //         isRepeated = false
  //         for(let j = i+1; j < arr.length; j++) {
  //           if(arr[i].text == arr[j].text)
  //             isRepeated = true;
  //         }
  //         if(!isRepeated)
  //           hello.push(arr[i])
  //       }
  //       return hello.slice(0,5)
  //     }

  //     ctx.body = { code: 200, message: 'ok', data: new_locations }
  //   } catch(e) {
  //     logger.error('app getLastLocation error', e)
  //   }
  // }

  static async searchDevice (ctx) {
    try {
      const { type, search } = ctx.query

      if(type === 'onchange' && (search == '' || search == undefined) ) return ctx.body = { code: 200, message: 'ok', data: [] }
      else if(type === 'onchange' && search ) {
        const result = await Device.find({ "$or" : [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }] }).limit(10)
        ctx.body = { code: 200, message: 'ok', data: result }
      } 
      else if (type === 'submit' && search) {
        const hot = await Hot.findOneAndUpdate({ type: 'device', text: search }, { $inc: { weights: 1 }}, { new: true, upsert: true })
        ctx.body = { code: 200, message: 'ok', data: hot }
      }
      else {
        let docs = await Device.find()
        ctx.body = { code: 200, message: 'ok', data: docs }
      }
    } catch(e) {
      logger.error('app searchDevice error', e)
    }

  }

  static async getDeviceHots (ctx) {
    try {
      const hots = await Hot.find({ type: 'device' }).sort('-weights').limit(10)
      ctx.body = { code: 200, message: 'ok', data: hots }
    } catch(e) {
      logger.error('app getDeviceHots error', e)
    }
  }

  static async getDevices (ctx) {

    try {
    
      const { createTime, type, value, cc, pressure, combustible, address } = ctx.request.query
      // var devices;
      const { id } = ctx.request.decoded

      const matchArr = await Auth.find({ user: id, canView: true })
      var deviceArr = []

      matchArr.map((item, index) => {
        deviceArr.push(item.device)
      })


      //按时间排序
      if(createTime == "desc" || createTime == "asc") {
        const devices = await Device.find({ _id: { $in: deviceArr } }).sort({ createdAt: createTime })
        return ctx.body = { code: 200, message: 'ok', data: devices }
      }

      //
      else if(type && value) {
        const find = {}
        find[type] = value
        const devices = await Device.find( Object.assign({}, find, { _id: { $in: deviceArr } }) )
        return ctx.body = { code: 200, message: 'ok', data: devices }
      }

    //
      else if(cc || pressure || combustible || address) {
        const obj = { cc, pressure, combustible, address }
        for ( var key in obj) {
          if (obj[key] == 'null')
            delete obj[key]
        }

        const devices = await Device.find( Object.assign({}, obj, { _id: { $in: deviceArr } }) )
        return ctx.body = { code: 200, message: 'ok', data: devices }
      }

      else {
        const devices = await Device.find({ _id: { $in: deviceArr } })
        ctx.body = { code: 200, message: 'ok', data: devices }
      }
    } catch(e) {
        logger.error('app getDevices error', e)
    }

  }

  static async getDevice(ctx) {
    try {
      const { id } = ctx.request.decoded
      let { deviceId, start, end } = ctx.query

      let startTime = new Date(start)
      let endTime = new Date(end)

      const matchArr = await Auth.find( { user: id, device: deviceId } )


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
        doc = await Device.findById({ _id: deviceId })
        doc.timelines = doc.timelines.filter((item, index) => {
          return item.line_time >= startTime && item.line_time <= endTime
        })
        ctx.body = { code: 200, message: 'ok', data: doc }
      }
      else {
        doc = await Device.findById({ _id: deviceId })
      }
      ctx.body = { code: 200, message: 'ok', data: doc }
    } catch(e) {
      logger.error('app getDevice error', e)
    }
  }

  static async updateDeviceRemark(ctx) {
    try {
      const { deviceId, remark } = ctx.request.body
      const result = await Device.findByIdAndUpdate({ _id: deviceId }, { remark }, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('app updateDeviceRemark error', e)      
    }
  }

  static async addDeviceTimeline(ctx) {
    try {
      const { deviceId, line_type, line_time, line_des } = ctx.request.body
      const result = await Device.findByIdAndUpdate({ _id : deviceId },
                                    { $push : { timelines: { line_type, line_time, line_des }}},
                                    { new: true }
                                  )
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('app addDeviceTimeline error', e)      
    }
  }

  static async addDeviceImages(ctx) {
    try {
      const { deviceId } = ctx.query
      const ossResult = await oss.uploadMulters('devices', ctx)
      if(ossResult) {
        var result
        ossResult.map( async (item, index)=> {
          const resultOne = await Device.findByIdAndUpdate({ _id: deviceId },
                                     { $push: { images: { url: item }}},
                                     { new: true }
                                    )
          if(index == (ossResult.length - 1)) result = resultOne
        })
        return ctx.body = { code: 201, message: '上传成功', data: result } 
      } else ctx.body = { code: 501, message: '上传文件失败', data: ossResult }
    } catch(e) {
      logger.error('app addDeviceImages error', e)
    }
  }

  static async getNotices(ctx) {
    try {
      const { id } = ctx.request.decoded 
      const docs = await Notice.find({ 'user.id' : id }).sort('-createdAt')
      ctx.body = { code: 200, message: 'ok', data: docs }
    } catch(e) {
      logger.error('app getNotices error', e)     
    }
  }

  static async getOneNotice(ctx) {
    try {
      const { id } = ctx.query
      const doc = await Notice.findById({ _id: id })
      ctx.body = { code: 200, message: 'ok', data: doc }
    } catch(e) {
      logger.error('app getOneNotice error', e)           
    }
  }

  static async setAllRead(ctx) {
    try {
      const docs = await Notice.updateMany({}, { readed: true })
      ctx.body = { code: 201, message: 'ok', data: docs }
    } catch(e) {
      logger.error('app notice: setAllread error:', e)
    }
  }

  static async setOneRead(ctx) {
    try {
      const { id } = ctx.request.body
      const docs = await Notice.update({_id: id}, { readed: true })
      ctx.body = { code: 201, message: 'ok', data: docs }
    } catch(e) {
      logger.error('notice: setOneRead error:', e)
    }
  }

  static async setOrderSolved(ctx) {
    try {
      const { id } = ctx.request.body
      const doc = await Order.findByIdAndUpdate({_id: id}, { isDone: true })
      ctx.body = { code: 201, message: 'ok', data: doc }
    } catch(e) {
      logger.error('error: setOrderSolved error', e)
    }
  }

  static async getTimelinesSort(ctx) {
    const docs = await TimeLine.find({}, { _id : 0 })
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getMoniterDevs(ctx) {

    const { id } = ctx.request.decoded
    
    const matchArr = await Auth.find({ user: id, canMonitor: true })
    
    var deviceArr = []

    matchArr.map((item, index) => {
      deviceArr.push(item.device)
    })

    const docs = await Device.find({ _id: { $in: deviceArr } })
    ctx.body = { code: 200, message: 'ok', data: docs }

  }

  static async searchMoniterDevs (ctx) {
    const { search } = ctx.query
    const { id } = ctx.request.decoded

    const matchArr = await Auth.find({ user: id, canMonitor: true })
    
    var deviceArr = []

    matchArr.map((item, index) => {
      deviceArr.push(item.device)
    })

    const docs = await Device.find({ _id: { $in: deviceArr }, number: new RegExp(search, 'i') })
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getccsort (ctx) {
    const docs = await CCSort.find()
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getpresort (ctx) {
    const docs = await PreSort.find()
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getfuelsort (ctx) {
    const docs = await FuelSort.find()
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async uploadOrderImages(ctx) {
    try {
      const result = await oss.uploadMulter('order', ctx)
      if(result.key)
        return ctx.body = { code: 400, message: `参数值错误, key: ${result.key}`, data: '' }
      else if(result.pubUrl)
        return ctx.body = { code: 201, message: '上传成功', data: { url: result.pubUrl } }   
      else ctx.body = { code: 501, message: '上传文件失败', data: result }
    } catch(e) {
      logger.error('app upload orders image error', e)
    }
  }

  static async deleteOneNotice(ctx) {
    try {
      const id = ctx.query.id
      const result = await Notice.remove({ _id: id })
      ctx.body = { code: 201, message: 'ok', data: result }
    } catch(e) {
      logger.error('app delete one notice error', e)
    }
  }

  static async getMoniterByNumber(ctx) {
    const { number } = ctx.query
    const doc = await Device.findOne({ number: number })
    if(doc) {
      let quota_data = []
      doc.data.forEach((item)=> {
        let key = Object.keys(item)[0]
        let obj_data = quotaDic(key)
        obj_data['orgName'] = key
        obj_data['value'] = item[`${key}`]
        quota_data.push(obj_data)
      })
      doc.data = quota_data
    }
    ctx.body = { code: 200, message: 'ok', data: doc }
  }

  static async getMoniterByNumberField(ctx) {
    const { number, field } = ctx.query
    const doc = await DataGraph.findOne({ number: number, field: field })
    ctx.body = { code: 200, message: 'ok', data: doc }
  }

  //Part
  static async searchPart(ctx) {
    const { type, search } = ctx.query

    if(type === 'onchange' && search ) {
      const result = await Part.find({ "$or" : [{ name: new RegExp(search, 'i') }, { model: new RegExp(search, 'i') }] }).limit(10).sort('-createdAt')
      ctx.body = { code: 200, message: 'ok', data: result }
    }

    else if (type === 'submit' && search) {
      const hot = await Hot.findOneAndUpdate({ type: 'part', text: search }, { $inc: { weights: 1 }}, { new: true, upsert: true })
      ctx.body = { code: 200, message: 'ok', data: hot }
    }
    else {
      let docs = await Part.find().sort('-createdAt')
      ctx.body = { code: 200, message: 'ok', data: docs }
    }
  }

  static async getPartHots(ctx) {
    const docs = await Hot.find({ type: 'part' }).sort('-weights').limit(10)
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getFirstClassParts(ctx) {
    const docs = await Part.find({}, { name: 1 })
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getSecondClassParts(ctx) {
    const { name } = ctx.query
    const docs = await Part.find({ name: name }, { model: 1 })
    ctx.body = { code: 200, message: 'ok', data: docs }
  }

  static async getSinglePart(ctx) {
    const { id } = ctx.query
    const doc = await Part.findById({ _id: id })
    ctx.body = { code: 200, message: 'ok', data: doc }
  }

  static async deleteOrderImage(ctx) {
    const { url } = ctx.request.body
    const ossResult = await oss.delete(url)
    if(!ossResult.del) {
      const result = await deleteFile(url, 'static/upload/')
    }
    ctx.body = { code: 201, message: 'ok', data: ossResult.del ? ossResult : result }
  }




}

module.exports = App