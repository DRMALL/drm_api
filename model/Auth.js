
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Device = require('./Device')

const authSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  },
  device: {
    type: Schema.Types.ObjectId,
    ref : 'Device'
  },
  canView: {
    type: Boolean,
    default: false
  },
  canMonitor: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

// authSchema.post('save', async (doc, next) => {
//   const { user, device, canView, canMonitor } = doc

//   if(canView) {
//     Device.where({ _id: device })
//           .update( { $push: { canViews: user } }, () => {
//               // next()
//             }
//           )
//   }
//   if(canMonitor) {
//     Device.where({ _id: device })
//           .update( { $push: { canMonitors: user } }, () => {
//               // next()
//             }
//           )
//   }
//   await next()

// })

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth