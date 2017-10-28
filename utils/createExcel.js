const excelPort = require('excel-export')
const moment = require('moment')
const DevMoniter = require('../model/DevMoniter')
const dic = require('./dic')
const allQuotas = []

dic.arr.map(item => allQuotas.push(Object.keys(item)[0]))

function beforeCellWrite(row, cellData) {
  if (!cellData)
    return ' --- '
  else
    return cellData
}

async function createExcel(number, startTime, endTime) {
    let dataArray = await getData(number, startTime, endTime)
    let conf = formatExcel(dataArray)

    let excelBuffer = excelPort.execute(conf)
    return new Buffer(excelBuffer, 'binary')

} 

async function getData(number, startTime, endTime) {
  const data = await DevMoniter.find({ number, ts: { $gte: startTime, $lte: endTime }}, null, {limit: 5000, sort: {_id: -1}})
  return data
}

function formatExcel(dataArray) {

  let conf = {}
  let cols = createCols()
  let rows = createRows(dataArray)

  conf.cols = cols
  conf.rows = rows
  conf.stylesXmlFile = 'styles.xml'
  conf.name = 'mysheet'

  return conf
}

function createCols() {
  let cols = []

  cols.push({caption: '设备编号', type: 'string', width: 30})
  cols.push({caption: '时间戳', type: 'string', width: 30})
  dic.arr.map(item => {
    cols.push({ caption: item.quotaName, type: 'string', width: 30, beforeCellWrite })
  })
  return cols
}

function createRows(dataArray) {
  let rows = []

  for (let i = 0; i < dataArray.length; i++) {
    let row = []
    dataArray[i].ts = moment(new Date(Number(dataArray[i].ts))).format('YYYY-MM-DD HH:mm:ss')
    row.push(dataArray[i].number)
    row.push(dataArray[i].ts)
    for (let j = 0; j < dataArray[i].data.length; j++) {
      let keyName = Object.keys(dataArray[i].data[j])[0]
      let key = allQuotas.indexOf(keyName)
      if (key != -1) row[key + 2] = String(dataArray[i].data[j][keyName])
    
    }
    rows.push(row)
  }

  return rows
}


module.exports = createExcel

