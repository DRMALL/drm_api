
const fs = require('fs')

function deleteFile(filename, path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path + filename, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}


module.exports = deleteFile