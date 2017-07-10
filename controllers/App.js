
// var mongoose = require('mongoose')

import User from '../model/User'
import News from '../model/News'
import jwt from 'jsonwebtoken'
import { cert } from '../config'
import { busboys } from '../utils/upload'
import { compare } from '../utils/util'
import bcrypt from 'bcrypt'



class App {

  static async Index (ctx) {
    ctx.body = 'app is coming'
  }

  //登录
  static async session (ctx) {
    const { email, password } = ctx.request.body
    if(!email || !password)
      return ctx.body = { code: 400, message: '缺少必要的参数 email, password', data: '' }

    const result = await User.findOne({ email })
    if(!result)
      return ctx.body = { code: 401, message: '用户名或密码错误', data: '' }

    const isvalid = await bcrypt.compare(password, result.password)
    if(!isvalid)
      return ctx.body = { code: 401, message: '用户名或密码错误', data: '' }

    const token = jwt.sign({ id: result._id }, cert)
    ctx.body = { code: 201, message: 'ok', data: token }

  }

  //获取用户信息
  static async getUserInfo(ctx) {
    const { id } = ctx.request.decoded 
    const result = await User.findById({_id: id })
    if(!result)
      return ctx.body = { code: 404, message: '未找到该用户', data: '' }
    ctx.body = { code: 200, message: 'ok', data: result }
  }

  //修改用户信息
  static async UpdateUser(ctx) {

    const { id } = ctx.request.decoded
    const bodyData = ctx.request.body

    try {
      const result = await User.findOneAndUpdate({ _id: id }, bodyData, { new: true })
      ctx.body = { code: 201, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 502, message: '更新数据时出错', data: e }
    }
  }

  //
  static async Upload(ctx) {
    ctx.body = await busboys (ctx);
    console.log(ctx.body)
  }

  static async getNews(ctx) {
    try {
      const result = await News.find()
      ctx.body = { code: 200, message: 'ok', data: result }
    }
    catch(e) {
      ctx.body = { code: 502, message: '获取数据时出错', data: e }
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


}

export default App