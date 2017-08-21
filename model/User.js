
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  phone: Number,
  company_name: String,
  address: String,
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
