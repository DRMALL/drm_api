
const DevMoniter = require('../model/DevMoniter')
const DataGraph = require('../model/DataGraph')

module.exports = async (ctx) => {
  const { number, data, ts } = ctx.request.body
  if(!data) {
    return ctx.body = { code: 400, message: '缺少必要的参数data', data: '' }
  }
  const doc = await DevMoniter.create({
    number: number,
    data: data,
    ts: ts,
  })
  ctx.body = { code: 201, message: 'ok', data: doc }
  // const create_graph = await DataGraph.create({number: '123456', field: '123456', values: [] })
  // ctx.body = { code: 201, message: 'ok', data: create_graph }
}
