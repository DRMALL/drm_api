const quotaDic = require('../utils/dic').quotadic

function to_app_data(normal_data) {
  var obj = {}
    , data_arr = []
  normal_data.data.forEach((item)=> {
    var key = Object.keys(item)[0]
    let obj_index = quotaDic(key)
    obj_index['orgName'] = key
    obj_index['value'] = item[`${key}`]
    data_arr.push(obj_index)
  })
  obj['number'] = normal_data.number
  obj['ts'] = normal_data.ts
  obj['data'] = data_arr
  return obj
}

module.exports = to_app_data