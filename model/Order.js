
import mongoose from 'mongoose'

const  Schema = mongoose.Schema

const orderSchema = new Schema({
  title: { type: String },
  category: { type: String },
  content: { type: String },
  user: {
    id: String,
    name: String,
    email: String,
  } ,
  advice: { type: String },
  isHanlded: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)