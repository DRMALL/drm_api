
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeLineSchema = new Schema({
  text: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('TimeLine', timeLineSchema)