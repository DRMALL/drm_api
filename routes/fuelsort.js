
const Router = require('koa-router')
const fuelsort = new Router()
const FuelSort = require('../model/FuelSort')

fuelsort.post('/', async (ctx) => {
  const { text } = ctx.request.body
  if(!text) {
    return ctx.body = { code: 400, message: '缺少必要的参数text', data: '' }
  }
  const doc = await FuelSort.create({ text })
  ctx.body = { code: 201, message: 'ok', data: doc }
})


fuelsort.get('/', async (ctx) => {
  const docs = await FuelSort.find({})
  ctx.body = { code: 200, message: 'ok', data: docs }
})


fuelsort.get('/:id', async (ctx) => {
  const id = ctx.params.id
  const doc = await FuelSort.findById({ _id: id })
  ctx.body = { code: 200, message: 'ok', data: doc }
})


fuelsort.put('/:id', async (ctx) => {
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await FuelSort.findByIdAndUpdate({_id: id}, body, { new: true })
  ctx.body = { code: 201, message: 'ok', data: result }
})

fuelsort.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  const result = await FuelSort.remove({ _id: id })
  ctx.body = { code: 201, message: 'ok', data: result }
})


module.exports = fuelsort

