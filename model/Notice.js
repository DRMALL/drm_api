import mongoose from 'mongoose'
const Schema = mongoose.Schema

const noticeSchema = new Schema({
  types: String,      //工单信息或设备检测
  des: String,        //描述
  status: String,     //状态
  readed: Boolean,    //已读/未读
  order: {            //工单信息
    content: String,
    feedback: String,
    time: String,
  }
})

const Notice = mongoose.model('Notice', noticeSchema)

export default Notice