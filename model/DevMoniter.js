
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const devMoniterSchema = new Schema({
  number: String,
  data: []
})

module.exports = mongoose.model('DevMoniter', devMoniterSchema)