
import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  isSolved: { type: Boolean, default: true },
  hot: []
}, { timestamps: true } )

bugSchema.statics.searchByContent = function(search) {
  return new Promise((resolve, reject) => {
      this.find({ 'content': new RegExp(search, 'i') })
        .exec((err, docs) => {
          if(err) reject(err)
          else resolve(docs)
        })
  })
}

bugSchema.post('find', function (doc, next) {
    // console.log('post-find-this:', this)
    // console.log('post-find-doc', doc);
    next();
});


export default mongoose.model('Bug', bugSchema)

