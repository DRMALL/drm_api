
import mongoose from 'mongoose'

const  Schema = mongoose.Schema

const orderSchema = new Schema({
  title: { type: String },
  bug: { type: Schema.Types.ObjectId, ref: 'Bug' },
  content: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  isHanlded: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
})

export default mongoose.model('Order', orderSchema)