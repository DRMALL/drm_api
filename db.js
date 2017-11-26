require('dotenv').config()
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PWD = process.env.DATABASE_PWD

const mongoose = require('mongoose')
  , db = mongoose.connection
  
mongoose.Promise = global.Promise

mongoose.connect(`mongodb://localhost/drm?user=${DATABASE_USER}&pass=${DATABASE_PWD}`, {useMongoClient: true})

db.on('error', console.error.bind(console, 'connect error:'))

db.once('open', () => {
  console.log('mongoose opened!')
})
