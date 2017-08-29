
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const preSortSchema = new Schema({
  text: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('PreSort', preSortSchema)