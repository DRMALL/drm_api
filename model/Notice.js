const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noticeSchema = new Schema({
  types: String,      //工单信息或设备检测
  des: String,        //描述
  status: String,     //状态
  readed: Boolean,    //已读/未读
  user: {
    id: String,
    name: String,
    email: String,
  },
  order: {            //工单信息
    id: String,
    content: String,
    feedback: String,
    time: String,
  }
}, { timestamps: true })

module.exports = mongoose.model('Notice', noticeSchema)

