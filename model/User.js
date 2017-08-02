
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'why no names?']
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
  company_name: String,
  address: String,
}, { timestamps: true })



export default mongoose.model('User', userSchema)
