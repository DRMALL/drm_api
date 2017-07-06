

import mongoose from 'mongoose'
import User from '../model/User'
import jwt from 'jsonwebtoken'
import { cert, initAdmins } from '../config'


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
    ctx.body = { token }
  }

  //新增用户
  static async newUser(ctx) {
    const { name, password, email, phone, company_name, address } = ctx.request.body
    if(!name || !password || !email || !phone || !company_name || !address) {
      return ctx.body = {
        code: 400,
        message: '缺少必要的参数 admin, password, email, phone, company_name, address',
        data: ''
      }
    }
    try {
      const result = await User.create({ name, password, email, phone, company_name, address })
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



}

export default Admin
