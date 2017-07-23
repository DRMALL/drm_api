
import mongoose from 'mongoose'
const Schema = mongosoe.Schema

const hotSchema = new Schema({
  text: String,
  weights: Number,
})

const Hot = mongoose.model('Hot', hotSchema)

export default Hot


