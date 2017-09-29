
const Device = require('../model/Device')

module.exports = async (obj) => {
  if(obj.number) {
    return await Device.findOne({number: obj.number})
  } else return null
}