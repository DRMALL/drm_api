
const Device = require('../model/Device')
const DevMoniter = require('../model/DevMoniter')
const DataGraph = require('../model/DataGraph')
const quotaDic = require('../utils/quotaDic')
const create_alarm_notice = require('./create_alarm_notice')

module.exports = async (obj) => {
  const dev_moniter_data = await DevMoniter.create(obj)
  if(dev_moniter_data.data) {
    const device_data = await Device.findOneAndUpdate({number: obj.number}, { $set: { data: obj.data, ts: Number(obj.ts) || 0 }}, { new: true, upsert: true })
    if(device_data) {
      device_data.data.forEach((item, index)=> {
        setTimeout(async () => {
          const key = Object.keys(item)[0]
          const valObj = { num: item[key], timeStamp: Number(obj.ts) || 0 }
          if(quotaDic(key).quotaClass === 3 && Number(item[key]) == 1 ) {
            create_alarm_notice(obj, device_data._id, item, quotaDic(key).quotaName)
          } else if(quotaDic(key).quotaClass !== 3) {
            const exist_graph = await DataGraph.findOne({number: obj.number, field: key})
            if(exist_graph) {
              const data_graph = await DataGraph.findOneAndUpdate({number: obj.number, field: Object.keys(item)[0]}, { $push: { values: valObj }}, { new: true })
            } else {
              const data_graph = await DataGraph.create({number: obj.number, field: key, values: [valObj] })
            }
          }
        }, 1000*index)
      })
      if(device_data) {
        return dev_moniter_data
      }
    }
  }
}

// myEmitter.emit('orderNotice', noticeResult)  Notice