
const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const bugSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  category: { 
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  content: {
    type: String,
    required: true
  }, 
  isSolved: { type: Boolean, default: true }
}, { timestamps: true })

bugSchema.statics.searchByContent = function(search) {
  return new Promise((resolve, reject) => {
      this.find({ 'content': new RegExp(search, 'i') })
        .exec((err, docs) => {
          if(err) reject(err)
          else resolve(docs)
        })
  })
}

bugSchema.index({ content: "text" })

module.exports = mongoose.model('Bug', bugSchema)

