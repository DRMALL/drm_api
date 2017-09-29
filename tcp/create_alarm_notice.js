
const Device = require('../model/Device')
const Notice = require('../model/Notice')
const Auth = require('../model/Auth')
const myEmitter = require('./emitter')

async function create_alarm_notice (obj, devId, item, des) {
  let sendSocket = false
  const auths_data = await Auth.find({device: devId})
  auths_data.forEach( async (auth)=> {
    if(auth.canMonitor) {
      const notice_data = await Notice.create({
        types: 'device',
        des: `${obj.number}设备: ${des},请留意！`,
        status: 'true',
        readed: false,
        user: {
          id: auth.user,
          name: '',
          email: '',
        },
        order: {
          id: null,
          content: null,
          feedback: null,
          images: null,
          time: null,
        },
      })
      if(notice_data) sendSocket = true
    }
  })
  if(sendSocket) myEmitter.emit('orderNotice', {msg: 'ok'})
}

module.exports = create_alarm_notice