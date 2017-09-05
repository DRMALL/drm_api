/*
 * 输入 文件位置
 * 输出 数组JSON格式
 * 
 */

function formatXLS(path) {
  const xlsx = require('node-xlsx')
  const fs = require('fs')

  // const workSheetsFromFile = xlsx.parse(fs.readFileSync(`${__dirname}/a.xls`));

  const workSheetsFromFile = xlsx.parse(fs.readFileSync(path));
  const { name, data } = workSheetsFromFile[0]
  
  var result = []

  data.map((item, index) => {
    result.push({
      code  :  item[0],
      name  :  item[1],
      model :  item[2],
      unit  :  item[3]
    })
  })

  return result
}

module.exports = formatXLS