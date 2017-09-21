const crypto = require('crypto')
    , salt = 'sparklog+=newteo'

const logger = require('../utils/logger')

module.exports = (data) => {

  data = new Buffer(data, 'base64')
  const decipher = crypto.createDecipher('aes-128-ecb', salt)
  decipher.setAutoPadding(false)
  let decrypted = decipher.update(data, 'binary', 'utf8')
  decrypted += decipher.final('utf8')

  decrypted = decrypted.replace(/\0/g, '')
  console.log(decrypted)
  const obj = JSON.parse(decrypted)
  console.log(obj)
  return {
    number: obj.deviceId,
    data: obj.indexes,
    ts: obj.ts
  }
}