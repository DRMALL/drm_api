
/*
 * @{params} number
 * @{return} str
 * 生成 num 长度的随机字符串
 */

function generate_nonstr(num) {

  if(!num) throw new Error('the params num is isRequired or can not be 0')

  if(typeof num !== 'number')
    throw new TypeError('this num need to be a number type')

  const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  
  var result = [], index = 0;

  for(let i = 0; i < num; i ++) {
    index = Math.floor( (Math.random() * str.length) )
    result.push(str[index])
  }

  return result.join('')
}

module.exports = generate_nonstr