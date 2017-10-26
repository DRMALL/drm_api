const excelPort = require('excel-export')
const moment = require('moment')
const fs = require('fs')
const Device = require('../model/Device')
const OTStable = require('./OTStable')
const tableStore = new OTStable()
const logger = require('./logger')
// const allQuotas = require('./allQuotas')
const dic = require('./dic')
const allQuotas = []

dic.arr.map(item => [].push(Object.keys(item)[0]))


var count = 0

async function getTableOne(number, field) {
  var result = null
  result = await tableStore.getRow({
    tableName: 'DataGraph',
    primaryKey: [
      { 'number' : number },
      { 'field' : field },
    ],
    maxVersions: 1
  })
  logger.info('excel got tableStore counted %s times!', count++)
  return result
}

async function getData(number) {
  return new Promise(async (resolve, reject)=> {
    //获取数据
    var resultArr = []
    for(var i = 0; i < allQuotas.length; i++ ) {
      var tableOne = await getTableOne(number, allQuotas[i])
      if(tableOne) {
        resultArr.push(tableOne)
      }
    }
    resolve(resultArr)
  })
}

async function changeData(number, startTime, endTime) {
  return new Promise(async (resolve, reject)=> {
    var resultArr = await getData(number)
    try {
      //数据转变
      var newObjArr = []
        , stampArr = []
      //   , startStamp = 9999999999999
      //   , endStamp = 0
      // resultArr.forEach((item)=> {
      //   if(item.attributes && Number(item.attributes[0].timestamp) < startStamp) startStamp = Number(item.attributes[0].timestamp)
      //   if(item.attributes && Number(item.attributes[item.attributes.length - 1].timestamp) > endStamp) endStamp = Number(item.attributes[item.attributes.length - 1].timestamp)
      // })
      resultArr.forEach((item)=> {
        if(item.attributes) {
          item.attributes.forEach((attribute, index2)=> {
            if(stampArr.indexOf(Number(attribute.timestamp)) < 0 && 
              (Number(attribute.timestamp) >= Number(startTime) && Number(attribute.timestamp) <= Number(endTime))) {
              stampArr.push(Number(attribute.timestamp))
            }
          })
        }
      })
      // console.log(stampArr)
      
      var newResultArr = resultArr
      for(var t = 0; t < stampArr.length; t++) {
        var newObjOne = {}
        // console.log(stampArr[t])
        newResultArr.forEach((item, index)=> {
          // console.log(item.attributes ? item.attributes.length : 0)
          if(item.attributes) {
            item.attributes.forEach((attribute, index2)=> {
              if(Number(attribute.timestamp) == stampArr[t]) {
                if(!newObjOne.number) {
                  newObjOne['number'] = String(item.primaryKey[0].value)
                  newObjOne['ts'] = Number(attribute.timestamp)
                  newObjOne['data'] = { [String(item.primaryKey[1].value)] : Number(attribute.columnValue) }
                  newResultArr[index].attributes.splice(index2, 1)
                  return 
                } else {
                  newObjOne['data'][String(item.primaryKey[1].value)] = Number(attribute.columnValue)
                  newResultArr[index].attributes.splice(index2, 1)
                  return
                }
              }
            })
          }
        })
        if(newObjOne.number) {
          newObjArr.push(newObjOne)
        }
      }
      resolve(newObjArr)
    } catch(err) {
      reject(err)
    }
  })
}

async function moniterExcel(number, startTime, endTime) {
  // return new Promise( async (resolve, reject)=> {
    var newObjArr = await changeData(number, startTime, endTime)
    // console.log(JSON.stringify(newObjArr))
    //入表
    var conf = {}
    var cols = []
    cols.push({caption: '设备编号', type: 'string', width: 25})
    cols.push({caption: '时间戳', type: 'string', width: 25})
    dic.arr.map(item => {
      cols.push({ caption: item.quotaName, type: 'string', width: 30 })
    })
    conf.cols = cols

    var rows = []
    newObjArr.map((item, index) => {
      var rowData = []
      item.ts = moment(new Date(item.ts)).format('YYYY-MM-DD HH:mm:ss')
      Object.keys(item).map((item2, index2) => {
        rowData.push(item[item2])
      })
      rows.push(rowData)
    })

    conf.rows = rows

    conf.stylesXmlFile = 'styles.xml'
    conf.name = 'mysheet'
    var excelBuffer = excelPort.execute(conf)
    return new Buffer(excelBuffer, 'binary')
    // resolve(new Buffer(excelBuffer), 'binary')

    //存到本地生成路径
    // var uploadDir = 'static/'
    //   , filename = 'moniterData'
    //   , filePath = `${uploadDir}${filename}${new Date().getTime()}.xlsx`
    //   , fileStream = fs.createWriteStream(filePath, { 
    //     flags: 'w', 
    //     defaultEncoding: 'binary', 
    //     fd: null, 
    //     mode: 0o666, 
    //     autoClose: true 
    //   })
    // fileStream.write(excelBuffer)
    // fileStream.end(()=> {
    //   resolve(filePath)
    // })
  // })
} 



module.exports = moniterExcel

