
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partSchema = new Schema({
  code: String,       //配件代号
  name: String,       //配件名称
  model: String,      //型号
  reserve: String,    //库存
  types: String,      //类型
  remark: String,     //备注
  unit: String,       //单位
  device: String,     //设备编号,使用设备
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema)