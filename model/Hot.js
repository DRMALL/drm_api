
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const hotSchema = new Schema({
  type: { type: String, default: 'bug' },
  text: String,
  weights: { type: Number, default: 0 },
})

const Hot = mongoose.model('Hot', hotSchema)

export default Hot