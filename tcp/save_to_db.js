
const DevMoniter = require('../model/DevMoniter')

module.exports = async (obj) => {
  return await DevMoniter.create(obj)
}