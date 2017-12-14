
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fitCategoryOneSchema = new Schema({
  name:  { type: String, required: [true, '请输入一级分类名称' ]  },       //分类名称
}, { timestamps: true })

module.exports = mongoose.model('FitCategoryOne', fitCategoryOneSchema)