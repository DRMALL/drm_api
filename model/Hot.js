
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotSchema = new Schema({
  type: { type: String, default: 'bug' },
  text: String,
  weights: { type: Number, default: 0 },
})

module.exports = mongoose.model('Hot', hotSchema)