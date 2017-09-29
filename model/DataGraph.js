
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataGraphSchema = new Schema({
  number: String,
  field: String,
  values: [],
}, { timestamps: true })

module.exports = mongoose.model('DataGraph', dataGraphSchema)