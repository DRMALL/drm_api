
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fuelSortSchema = new Schema({
  text: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('FuelSort', fuelSortSchema)