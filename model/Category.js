
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  text: { type: String, required: true },
  sortIndex: { type:Number, default: 0 },
})


module.exports = mongoose.model('Category', categorySchema)