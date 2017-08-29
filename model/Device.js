
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
  classify: String,
  location: [{
    time: { type: Date, default: Date.now },
    text: String
  }],
  timelines: [{
    line_type: String,
    line_des: String,
    line_time: Date
  }],
  incharges: [],
  remark: String,
}, { timestamps: true })

deviceSchema.index({ name: "text", description: "text" })


module.exports = mongoose.model('Device', deviceSchema)
