

const crypto = require('crypto')
const salt = require('../config').salt


function verify_socket_token (data) {

  var arr = data.split('&')

  var token = arr[0].replace('token=', '')
  var data = arr[1].replace('data=', '')

  var prefix = token.split('.')[0]
  var net_sign = token.split('.')[1]

  var local_sign = generate_sign(prefix, salt)

  var result = {}


  if(net_sign == local_sign) {
    result.status = true
    result.payload = JSON.parse(decode_base64(prefix))
    result.data = JSON.parse(decode_base64(data))
  }
  else {
    result.status = false
    result.payload = null
    result.data = null
  }

  return result

}


function decode_base64(prefix) {
  return new Buffer(prefix, 'base64').toString()
}

function generate_sign(prefix, salt) {
  const hmac = crypto.createHmac('sha256', salt)
  hmac.update(prefix)
  return hmac.digest('base64')  
}




module.exports = verify_socket_token