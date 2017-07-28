
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const deviceSchema = Schema({
  name: String,
  number: String,
  images: [],
  cc: String,   //排量
  pressure: String,   //压力
  combustible: String,  //燃料
  description: String,
  online: Boolean,
  address: String,
  location: [{
      time: { type: Date, default: Date.now },
      text: String
  }],
  timelines: [{
    
  }],
  remark: String,
}, { timestamps: true })


const Device = mongoose.model('Device', deviceSchema)
module.exports = Device

