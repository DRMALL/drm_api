
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const hotSchema = new Schema({
  text: String,
  weights: Number,
})

const Hot = mongoose.model('Hot', hotSchema)

export default Hot


