
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fitCategoryTwoSchema = new Schema({
  name:  { type: String, required: [true, '请输入二级分类名称' ]  },       //分类名称
}, { timestamps: true })

module.exports = mongoose.model('FitCategoryTwo', fitCategoryTwoSchema)