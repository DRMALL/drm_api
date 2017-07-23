
import mongoose from 'mongoose'

const  Schema = mongoose.Schema

const orderSchema = new Schema({
  title: { type: String },
  category: { type: String },
  content: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  advice: { type: String },
  isHanlded: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)