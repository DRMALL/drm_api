
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Bug' }
  content: { type: String },
  asker: { type: Schema.Types.ObjectId, ref: 'User'},
  isHanlded: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
})

export default mongoose.model('Order', orderSchema)