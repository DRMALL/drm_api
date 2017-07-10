
import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  content: { type: String, required: true },
  images: [],
  author: { type: String },
  published: { type: Boolean, default: false, required: true },
  create_time: { type: Date, default: Date.now },
  publish_time: { type: Date }
})

export default mongoose.model('News', newsSchema)