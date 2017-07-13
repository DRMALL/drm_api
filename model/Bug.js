
import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  isSolved: { type: Boolean, default: true },
  
}, { timestamps: true } )

export default mongoose.model('Bug', bugSchema)

