
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i
  },
  phone: {
    type: Number,
    required: true,
    // match: /^1[3|4|5|7|8][0-9]{9}$/
  },
  company_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
}, { timestamps: true })

// userSchema.set('validateBeforeSave', true);

// userSchema.pre('save', function(next) {
//   //this 代表要存储的数据
//   console.log(this)
//   next();
// })

// userSchema.post('validate', function(doc, next) {
//   console.log('this gets printed second');
// });


export default mongoose.model('User', userSchema)
