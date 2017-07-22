import mongoose from 'mongoose'
const Schema = mongoose.Schema


const counterSchema = Schema({
  _id: { type: 'String', required: true },
  seq: { type: Number,  default: 0 }
})

const Counter = mongoose.model('Counter', counterSchema);

export default Counter
