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

dic.arr.map(item => allQuotas.push(Object.keys(item)[0]))

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

function moniterExcel(number, startTime, endTime) {
  return new Promise( async (resolve, reject)=> {
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

    // for(var i = 0; i < newObjArr.length; i++) {
    //   excel_data.push([
    //     newObjArr[i].number,
    //     `${moment(new Date(newObjArr[i].ts)).format('YYYY-MM-DD HH:mm:ss')}`,
    //     `${newObjArr[i].data.ent_air_pressure_pv !== undefined ? newObjArr[i].data.ent_air_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.ent_air_pressure_sv !== undefined ? newObjArr[i].data.ent_air_pressure_sv : '暂无'}`,
    //     `${newObjArr[i].data.air_flow_rate !== undefined ? newObjArr[i].data.air_flow_rate : '暂无'}`,
    //     `${newObjArr[i].data.air_flow_total !== undefined ? newObjArr[i].data.air_flow_total : '暂无'}`,
    //     `${newObjArr[i].data.ent_oil_pressure_pv !== undefined ? newObjArr[i].data.ent_oil_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.ent_oil_pressure_sv !== undefined ? newObjArr[i].data.ent_oil_pressure_sv : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_outlet_presssure_pv !== undefined ? newObjArr[i].data.oilpump_outlet_presssure_pv : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_outlet_presssure_sv !== undefined ? newObjArr[i].data.oilpump_outlet_presssure_sv : '暂无'}`,
    //     `${newObjArr[i].data.oil_flow_rate !== undefined ? newObjArr[i].data.oil_flow_rate : '暂无'}`,
    //     `${newObjArr[i].data.oil_flow_total !== undefined ? newObjArr[i].data.oil_flow_total : '暂无'}`,
    //     `${newObjArr[i].data.ent_water_pressure_pv !== undefined ? newObjArr[i].data.ent_water_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.ent_water_pressure_sv !== undefined ? newObjArr[i].data.ent_water_pressure_sv : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_outlet_pressure_pv !== undefined ? newObjArr[i].data.waterpump_outlet_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_outlet_pressure_sv !== undefined ? newObjArr[i].data.waterpump_outlet_pressure_sv : '暂无'}`,
    //     `${newObjArr[i].data.water_flow_rate !== undefined ? newObjArr[i].data.water_flow_rate : '暂无'}`,
    //     `${newObjArr[i].data.water_flow_total !== undefined ? newObjArr[i].data.water_flow_total : '暂无'}`,
    //     `${newObjArr[i].data.run_total_time_pv !== undefined ? newObjArr[i].data.run_total_time_pv : '暂无'}`,
    //     `${newObjArr[i].data.run_total_time_hour !== undefined ? newObjArr[i].data.run_total_time_hour : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_pressure_pv !== undefined ? newObjArr[i].data.waterpump_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.rzt_temp_pv !== undefined ? newObjArr[i].data.rzt_temp_pv : '暂无'}`,
    //     `${newObjArr[i].data.rzt_temp_sv !== undefined ? newObjArr[i].data.rzt_temp_sv : '暂无'}`,
    //     `${newObjArr[i].data.rzt_pressure_pv !== undefined ? newObjArr[i].data.rzt_pressure_pv : '暂无'}`,
    //     `${newObjArr[i].data.rzt_pressure_sv !== undefined ? newObjArr[i].data.rzt_pressure_sv : '暂无'}`,
    //     `${newObjArr[i].data.cooling_water_temp_pv !== undefined ? newObjArr[i].data.cooling_water_temp_pv : '暂无'}`,
    //     `${newObjArr[i].data.cooling_water_temp_sv !== undefined ? newObjArr[i].data.cooling_water_temp_sv : '暂无'}`,
    //     `${newObjArr[i].data.krb_pv !== undefined ? newObjArr[i].data.krb_pv : '暂无'}`,
    //     `${newObjArr[i].data.krb_sv !== undefined ? newObjArr[i].data.krb_sv : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_driver_temp !== undefined ? newObjArr[i].data.oilpump_driver_temp : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_inverter_pv !== undefined ? newObjArr[i].data.oilpump_inverter_pv : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_inverter_sv !== undefined ? newObjArr[i].data.oilpump_inverter_sv : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_interver_in !== undefined ? newObjArr[i].data.oilpump_interver_in : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_driver_temp_pv !== undefined ? newObjArr[i].data.waterpump_driver_temp_pv : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_inverter_pv !== undefined ? newObjArr[i].data.waterpump_inverter_pv : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_inverter_sv !== undefined ? newObjArr[i].data.waterpump_inverter_sv : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_inverter_in !== undefined ? newObjArr[i].data.waterpump_inverter_in : '暂无'}`,
    //     `${newObjArr[i].data.tank_temp_pv !== undefined ? newObjArr[i].data.tank_temp_pv : '暂无'}`,
    //     `${newObjArr[i].data.tank_temp_svl !== undefined ? newObjArr[i].data.tank_temp_svl : '暂无'}`,
    //     `${newObjArr[i].data.tank_temp_svh !== undefined ? newObjArr[i].data.tank_temp_svh : '暂无'}`,
    //     `${newObjArr[i].data.stop_bit_store !== undefined ? newObjArr[i].data.stop_bit_store : '暂无'}`,
    //     `${newObjArr[i].data.ent_oil_value_start !== undefined ? newObjArr[i].data.ent_oil_value_start : '暂无'}`,
    //     `${newObjArr[i].data.ent_oil_valve !== undefined ? newObjArr[i].data.ent_oil_valve : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_auto_manual !== undefined ? newObjArr[i].data.waterpump_auto_manual : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_auto_manual !== undefined ? newObjArr[i].data.oilpump_auto_manual : '暂无'}`,
    //     `${newObjArr[i].data.pkf_position !== undefined ? newObjArr[i].data.pkf_position : '暂无'}`,
    //     `${newObjArr[i].data.pkf_close_in_postion !== undefined ? newObjArr[i].data.pkf_close_in_postion : '暂无'}`,
    //     `${newObjArr[i].data.pre_waterpump_status !== undefined ? newObjArr[i].data.pre_waterpump_status : '暂无'}`,
    //     `${newObjArr[i].data.waterpump_status !== undefined ? newObjArr[i].data.waterpump_status : '暂无'}`,
    //     `${newObjArr[i].data.oilpump_status !== undefined ? newObjArr[i].data.oilpump_status : '暂无'}`,
    //     `${newObjArr[i].data.dhq_status !== undefined ? newObjArr[i].data.dhq_status : '暂无'}`,
    //     `${newObjArr[i].data.fan_status !== undefined ? newObjArr[i].data.fan_status : '暂无'}`,
    //     `${newObjArr[i].data.pkf_open_status !== undefined ? newObjArr[i].data.pkf_open_status : '暂无'}`,
    //     `${newObjArr[i].data.pkf_close_status !== undefined ? newObjArr[i].data.pkf_close_status : '暂无'}`,
    //     `${newObjArr[i].data.pkf_open_in_postion_status !== undefined ? newObjArr[i].data.pkf_open_in_postion_status : '暂无'}`,
    //     `${newObjArr[i].data.pkf_close_in_postion_status !== undefined ? newObjArr[i].data.pkf_close_in_postion_status : '暂无'}`,
    //     `${newObjArr[i].data.tank_auto_manual !== undefined ? newObjArr[i].data.tank_auto_manual : '暂无'}`,
    //     `${newObjArr[i].data.heat1_status !== undefined ? newObjArr[i].data.heat1_status : '暂无'}`,
    //     `${newObjArr[i].data.heat2_status !== undefined ? newObjArr[i].data.heat2_status : '暂无'}`,
    //     `${newObjArr[i].data.heat3_status !== undefined ? newObjArr[i].data.heat3_status : '暂无'}`,
    //   ])
    // }
    conf.rows = rows
    var excelBuffer = excelPort.execute(conf)

    //存到本地生成路径
    var uploadDir = 'static/'
      , filename = 'moniterData'
      , filePath = `${uploadDir}${filename}${new Date().getTime()}.xlsx`
      , fileStream = fs.createWriteStream(filePath, { 
        flags: 'w', 
        defaultEncoding: 'binary', 
        fd: null, 
        mode: 0o666, 
        autoClose: true 
      })
    fileStream.write(excelBuffer)
    fileStream.end(()=> {
      resolve(filePath)
    })
  })
} 



module.exports = moniterExcel

