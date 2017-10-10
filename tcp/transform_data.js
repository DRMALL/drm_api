const crypto = require('crypto')
    , salt = 'sparklog+=newteo'
    , quotaDic = require('../utils/quotaDic')

const logger = require('../utils/logger')

module.exports = (data, conn) => {

  try {
    data = new Buffer(data, 'base64')
    const decipher = crypto.createDecipher('aes-128-ecb', salt)
    decipher.setAutoPadding(false)
    let decrypted = decipher.update(data, 'binary', 'utf8')
    decrypted += decipher.final('utf8')

    decrypted = decrypted.replace(/\0/g, '')
    console.log(decrypted)
    const obj = JSON.parse(decrypted)
    console.log(obj)

    let new_indexes = []
    obj.indexes.forEach((item)=> {
      if(quotaDic(Object.keys(item)[0]).quotaName != '未知') {
        new_indexes.push(item)
      }
    })

    return {
      number: obj.deviceId,
      data: new_indexes, //obj.indexes,
      ts: obj.ts
    }
  } catch(e) {
    conn.write('PEE')
    console.error(e)
  }
}