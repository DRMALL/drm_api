
module.exports = (data) => {

    var arr = data.split('&')

    arr = arr.map((item, index) => {
      item = item.replace(/\w+=/i, '')
      return item
    })

    var deviceId = arr[0]
    var keys = arr[1].split(',')
    var values = arr[2].split(',')
    var timestamps = arr[3].split(',')

    var moniterData = []

    for(let i = 0; i < keys.length -1 ; i++) {
      moniterData.push({
        key: keys[i],
        value: values[i],
        timestamp: timestamps[i]
      })
    }

    return obj = {
      number: deviceId,
      data: moniterData
    }
}