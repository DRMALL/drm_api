
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
  text: { type: String, required: true },
  sortIndex: { type:Number, default: 0 },
})


const Category = mongoose.model('Category', categorySchema)

export default Category