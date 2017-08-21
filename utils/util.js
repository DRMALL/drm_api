
const bcrypt = require('bcrypt');


function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      // Store hash in database
        if(err)
          reject(err)
        else
          resolve(hash)
      })
  })
}

module.exports = {
  hash,
}