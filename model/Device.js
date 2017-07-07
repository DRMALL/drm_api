
import mongoose from 'mongoose'

const deviceSchema = new mongoose.schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  pressure: { type: String, required: true },
  combustible: { type: String, required: true },
  displacement: { type: String, required: true },
  discription: { type: String, required: true },
  covers: [],
})