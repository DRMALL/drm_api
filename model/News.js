
const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true,
    maxlength: 64
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    url: String,
  }],
  author: String,
  publish_time: {
    type: Date, default: null
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
}, { timestamps: true })

module.exports =  mongoose.model('News', newsSchema)