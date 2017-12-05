
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partSchema = new Schema({
  code:  { type: String, required: [true, '请输入物料代码' ]  },       //配件代号
  name:  { type: String, required: [true, '请输入物料名称' ]  },       //配件名称
  model: { type: String },       //规格型号
  unit:  { type: String },       //单位
  levelOne: { type: String },
  levelTwo: { type: String },
  images: [],
  reserve: String,    //库存
  types: String,      //类型
  deviceCode: String, //设备编号,使用设备
  deviceName: String,
  remark: String     //备注
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema)