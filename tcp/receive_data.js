

function receive_data(data) {
  var arr = data.split('&')
  arr = arr.map((item, index) => {
    item = item.replace(/\w+=/i, '')
    return item
  })
  var token = arr[0]
  var keys = arr[1].split(',')
  var values = arr[2].split(',')
  var timestamps = arr[3].split(',')
  for(let i = 0; i < keys.length; i++) {
    console.log({
      key: keys[i],
      value: values[i],
      timestamp: timestamps[i]
    })
  }
}

module.exports = receive_data