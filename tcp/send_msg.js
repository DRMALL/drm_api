const User = require('../model/User')
const Device = require('../model/Device')
const Auth = require('../model/Auth')
const { quotaDic } = require('../utils/dic')
const SMS = require('../utils/SMS')




module.exports = async obj => {
  obj.data.map(async item => {

    const key = Object.keys(item)[0]
    const newObj = quotaDic(key)

    if (newObj.quotaClass != 3) return

    if (Number(item[key]) != 1) return 

    const popu = await Auth.find({canMonitor: true})
                  .populate('user', 'phone')
                  .populate('device', 'name')
                  .select('user device')
    
      popu.map(async item2 => {
        SMS(item2.user.phone, item2.device.name, newObj.quotaName)
      })
  })
}


