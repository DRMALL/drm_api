
const fs = require('fs')

function deleteFile(url, path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path + findFileName(url), (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

function findFileName(url) {
  if(typeof url !== 'string')
    throw Error('url must be a string')
  
  var urlArr = url.split('')
  var arr = []


  for(let i = urlArr.length - 1; 0 <= i; i--) {
    if(urlArr[i] == '/' ) break;
    else arr.push(urlArr[i])
  }

  return arr.reverse().join('')

}


module.exports = deleteFile