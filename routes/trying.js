
const DevMoniter = require('../model/DevMoniter')
const Part = require('../model/Part')
const uniqueObjArr = require('../utils/uniqueObjArr')
const OTStable = require('../utils/OTStable')
  , tableStore = new OTStable()
// const OSS = require('../utils/OSS')
//   , oss = new OSS()

module.exports = async (ctx) => {
  // const result = await oss.delete('')
  // if(result.del) {
  //   ctx.body = { code: 204, message: '删除成功', data: { result: result.del } }
  // }

  // const result = await tableStore.createTable({
  //   tableName: 'DataGraph',
  //   primaryKey: [
  //     { name: 'number', type: 'STRING' },
  //     { name: 'field', type: 'STRING' },
  //   ],
  //   maxVersions: 1
  // })
  // ctx.body = { data: result }

  // const result = await tableStore.getRow({
  //   tableName: 'DataGraph',
  //   primaryKey: [
  //     { 'number' : 'SN12345678' },
  //     { 'field' : 'ent_air_pressure_sv' },
  //   ],
  //   maxVersions: 1
  // })
  // ctx.body = { data: result }

  // const result = await tableStore.updateRow({
  //   tableName: 'DataGraph',
  //   primaryKey: [
  //     { 'number' : 'SN12345678' },
  //     { 'field' : 'ent_air_pressure_sv' },
  //   ],
  //   updateColumns: [{ 'num' : 523, 'timestamp' : 1507801083065 }]
  // })
  // ctx.body = { data: result }

  // const result = await tableStore.putRow({
  //   tableName: 'DataGraph',
  //   primaryKey: [
  //     { 'number' : '111' },
  //     { 'field' : '111' },
  //   ],
  //   attributeColumns: [
  //     { '111' : 111 }
  //   ]
  // })
  // ctx.body = { data: result }
}
