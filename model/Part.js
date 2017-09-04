
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partSchema = new Schema({
  code: { type: String, required: [true, '请输入物料代码' ] },       //配件代号
  name: { type: String, required: [true, '请输入物料名称'] },       //配件名称
  model: String,      //型号
  reserve: String,    //库存
  types: String,      //类型
  remark: String,     //备注
  unit: String,       //单位
  deviceCode: String, //设备编号,使用设备
  deviceName: String
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema)