
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth