
function switchCaption(key) {
  switch(key) {
    case 'name':
      return '设备名'
    case 'number':
      return '编号'
    case 'linestime':
      return '时间'
    case 'linestype':
      return '类型'
    case 'linesdes':
      return '描述'
    case 'cc':
      return '排量'
    case 'pressure':
      return '压力'
    case 'combustible':
      return '燃料'
    default:
      return null
  }
}

export default function transforExcel(sourceArray) {

  var keyArray = []
  var valueArray = []
  var insideArray = []

  sourceArray.map((obj, outindex) => {

    insideArray = []

    Object.keys(obj).map((key, index) => {
      if(keyArray.length <= index) {
        keyArray.push({ caption: switchCaption(key), type: typeof key })
      }
      insideArray.push(obj[key])
    })

    valueArray.push(insideArray)
  })

  return {
    valueArray,
    keyArray
  }

}

