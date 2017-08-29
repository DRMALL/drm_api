//排量分类

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ccSortSchema = new Schema({
  text: { type: String, required: [true, 'please input sort content']}
}, { timestamps: true })

module.exports = mongoose.model('CCSort', ccSortSchema)