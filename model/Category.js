
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
  text: { type: String, required: true },
  sortIndex: { type:Number, default: 0 },
})


const Category = mongoose.model('Category', categorySchema)


export default Category


// categorySchema.post('save', (doc, next) => {
//   counter.findByIdAndUpdate({ _id: 'categoryId'}, { $inc: {seq: 1} }, { new: true, upsert: true }, 
//   (err, counter) => {
//     if(err) return next(err)
//     doc.sortIndex = counter.seq
//     next()
//   })
// })
