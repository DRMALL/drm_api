const mongoose = require('mongoose')
  , db = mongoose.connection
  
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/drm')

db.on('error', console.error.bind(console, 'connect error:'))

db.once('open', () => {
  console.log('mongoose opened!')
})
