const User = require('../model/User')
const Device = require('../model/Device')
const Auth = require('../model/Auth')
const DevMoniter = require('../model/DevMoniter')
const { quotaDic } = require('../utils/dic')
const create_alarm_notice = require('./create_alarm_notice')

module.exports = async (obj) => {

  await DevMoniter.create(obj)
  await Device.findOneAndUpdate({number: obj.number}, { $set: { data: obj.data, ts: Number(obj.ts) || 0 }}, { new: true, upsert: true })

}
