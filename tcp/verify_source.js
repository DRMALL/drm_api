
function verify_source(data) {
  if(data.slice(0, 8) === 'deviceId') {
    return 'hardware'
  }
  else {
    return 'app'
  }
}

module.exports = verify_source