function uniqueObjArr(dataArr) {
  var newData = []
    , dataArrString = []
  dataArr.map((item, index)=> {
    if(dataArrString.length === 0) dataArrString.push(JSON.stringify(item))
    else {
      var exist = false
      dataArrString.map((item2, index2)=> {
        if(item2 === JSON.stringify(item)) exist = true
      })
      exist === false ? dataArrString.push(JSON.stringify(item)) : null
    }
  })
  dataArrString.map((item3, index3)=> {
    newData.push(JSON.parse(item3))
  })
  return newData
}

module.exports = uniqueObjArr