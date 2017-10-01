
const DevMoniter = require('../model/DevMoniter')
const DataGraph = require('../model/DataGraph')
const OSS = require('../utils/OSS')
  , oss = new OSS()

module.exports = async (ctx) => {
  const result = await oss.delete('')
  if(result.del) {
    ctx.body = { code: 204, message: '删除成功', data: { result: result.del } }
  }
}
