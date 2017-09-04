
const mongoose = require('mongoose')

const  Schema = mongoose.Schema

const orderSchema = new Schema({
  title: { type: String },
  category: { type: String },
  images: [],
  content: { type: String },
  user: {
    id: String,
    name: String,
    email: String,
  },
  advice: { type: String },
  isHanlded: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
}, { timestamps: true })

module.exports =  mongoose.model('Order', orderSchema)