

import mongoose from 'mongoose'
import User from '../model/User'
import jwt from 'jsonwebtoken'
import { cert, initAdmins } from '../config'
import { hash, compare } from '../utils/util'
import { busboys } from '../utils/upload'
import News from '../model/News'
import Bug from '../model/Bug'




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
      return ctx.body = { code: 401, message: '用户名或密码错误', data: '' }

    const token = jwt.sign({ admin, password }, cert)
    ctx.body = { code: 201, message: '', data: token }
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
    try {
      const encryptPass = await hash(password)
      const result = await User.create({ name, password: encryptPass , email, phone, company_name, address })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 500, message: '保存数据时出错', data: e }
    }
  }

  //获取所有用户
  static async getUsers (ctx) {
    try {
      const result = await User.find()
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 501, message: '查找数据时出错', data: e }
    }
  }

  //获取单个用户
  static async getUserById(ctx) {
    const userId = ctx.userId
    if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}
    try {
      const result = await User.findById(userId)
      if(!result) return ctx.body = { code: '404', message: '未找到该用户', data: result }
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 501, message: '查找数据时出错', data: e }
    }
  }

  //更新单个用户
  static async UpdateUser(ctx) {
    const userId = ctx.userId
    const bodyData = ctx.request.body
    if(!userId) return ctx.body = { code: 400, message: '缺少必要的param: id', data: ''}

    try {
      const result = await User.findOneAndUpdate({ _id: userId }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 502, message: '更新数据时出错', data: e }
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
      ctx.body = { code: 503, message: '删除数据时出错', data: e }
    }
  }


  static async uploadImg(ctx) {
    const upload = await busboys (ctx)
    if(upload.fieldname !== 'news')
      return ctx.body = { code: 405, message: '参数值错误, key: news', data: '' }
    if(!upload.success)
      return ctx.body = { code: 403, message: '上传文件失败', data: upload }
    return ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }
  }

  static async createNew(ctx) {
    let { title, abstract, content, published, images } = ctx.request.body
    if( !title || !abstract || !content || published === undefined || !images.length )
      return ctx.body = {
        code: 400, 
        message: '缺少必要的params: title, abstract, content, published, images',
        data: ''
      }
    const author = ctx.request.decoded.admin
    const result = await News.create({ title, abstract, content, author, published, images })
    ctx.body = { code: 201, message: '创建成功', data: result }
  }

  static async getNews(ctx) {
    const result = await News.find()
    ctx.body = { code: 200, message: '获取成功', data: result }

  }

  static async updateNew(ctx) {

    let { id } = ctx.query
    let bodyData = ctx.request.body

    const result = await News.findOneAndUpdate({ _id: id }, bodyData, { new: true })
    ctx.body = { code: 201, message: '更新成功', data: result }

  }

  static async deleteNew(ctx) {
    let { id } = ctx.query
    try {
      const result = await News.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      ctx.body = { code: 503, message: '删除数据时出错', data: e }
    }
  }

  static async getNewsById(ctx) {
    let { id } = ctx.query
    try {
      const result = await News.findById({ _id: id })
      ctx.body = { code: 201, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 503, message: '获取数据时出错', data: e }
    }
  }

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
    let { id } = ctx.query
    let bodyData = ctx.request.body

    const result = await Bug.findOneAndUpdate({ _id: id }, bodyData, { new: true })
    ctx.body = { code: 201, message: '更新成功', data: result }
  }

  static async deleteBug(ctx) {
    let { id } = ctx.query
    try {
      const result = await Bug.remove({ _id: id })
      ctx.body = { code: 201, message: '删除成功', data: {} }
    }
    catch(e) {
      ctx.body = { code: 503, message: '数据库出错', data: e }
    }
  }

  static async getBugs(ctx) {
    let { id } = ctx.query
    try {
      const result = await Bug.find()
      ctx.body = { code: 201, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 503, message: '数据库出错', data: e }
    }
  }

  static async getBug(ctx) {
    let { id } = ctx.query
    try {
      const result = await Bug.findById({ _id: id })
      ctx.body = { code: 201, message: '获取成功', data: result }
    }
    catch(e) {
      ctx.body = { code: 503, message: '数据库出错', data: e }
    }
  }


}

export default Admin
