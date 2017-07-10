
import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: { type: String, },
  abstract: { type: String, },
  images: [],
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  published: { type: Boolean, default: false },
  publish_time: { type: Date }
})

export default mongoose.model('News', newsSchema)