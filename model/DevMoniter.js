
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const devMoniterSchema = new Schema({
  number: String,
  data: []
}, { timestamps: true })

module.exports = mongoose.model('DevMoniter', devMoniterSchema)