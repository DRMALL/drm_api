
import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true, maxlength: 64 },
  content: { type: String, required: true },
  images: [],
  author: { type: String },
  published: { type: Boolean, default: false, required: true },
}, { timestamps: true })

export default mongoose.model('News', newsSchema)