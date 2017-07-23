
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const deviceSchema = Schema({
  name: String,
  number: String,
  images: [],
  cc: String,
  pressure: String,
  combustible: String,
  description: String,
  online: Boolean,
  incharge: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  address: String,
  timelines: [{
    time: String,
    type: String,
    description: String
  }]
}, { timestamps: true })

const Device = mongoose.model('Device', deviceSchema)
export default Device
