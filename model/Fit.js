
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fitSchema = new Schema({
  fitCategoryOne: {
    type: Schema.Types.ObjectId,
    ref : 'FitCategoryOne'
  },
  fitCategoryTwo: {
    type: Schema.Types.ObjectId,
    ref : 'FitCategoryTwo'
  },
  code:  { type: String, required: [true, '请输入物料代码' ]  },       //配件代号
  name:  { type: String, required: [true, '请输入物料名称' ]  },       //配件名称
  model: { type: String },       //规格型号
  unit:  { type: String },       //单位
  images: [],
  reserve: String,    //库存
  types: String,      //类型
  remark: String     //备注
}, { timestamps: true })

module.exports = mongoose.model('Fit', fitSchema)