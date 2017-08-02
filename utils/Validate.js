

function isEmail(email) {
  return /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(email)
}

function isPhone (number) {
  number = typeof number === 'number' ? number : Number(number)
  return /^1[3|4|5|7|8][0-9]{9}$/.test(number)
}

function ifLackPara() {
  /*
  @params Object
  判断Object中的字段是否都有值，如果都有值，返回 { retult : true }
  */

  if(typeof arguments[0] !== 'object')
    return new Error('arguments should be object')

  const keyArray = Object.keys(arguments[0])
  const paraArray = []

  for( let i = 0; i < keyArray.length; i++ ) {

    if(arguments[0][keyArray[i]] === undefined )
      paraArray.push(keyArray[i])
  }

  if(paraArray.length)
    return {
      result: false,
      message: `缺少必要的参数：${ paraArray.join(', ') }`
    }

  return {
    result: true,
  }
}


module.exports = {
  isEmail,
  isPhone,
  ifLackPara
}