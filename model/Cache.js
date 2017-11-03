
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const cacheSchema = Schema({
  name: String,
  number: String,
  phone: String,
  msg: String,
  ts: String,
}, { timestamps: true })

cacheSchema.index({ name: "text", description: "text" })


module.exports = mongoose.model('Cache', cacheSchema)
