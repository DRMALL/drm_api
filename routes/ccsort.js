const Router = require('koa-router')
const ccsort = new Router()
const CCSort = require('../model/CCSort')

ccsort.post('/', async (ctx) => {
  const { text } = ctx.request.body
  if(!text) {
    return ctx.body = { code: 400, message: '缺少必要的参数text', data: '' }
  }
  const doc = await CCSort.create({ text })
  ctx.body = { code: 201, message: 'ok', data: doc }
})


ccsort.get('/', async (ctx) => {
  const docs = await CCSort.find({})
  ctx.body = { code: 200, message: 'ok', data: docs }
})


ccsort.get('/:id', async (ctx) => {
  const id = ctx.params.id
  const doc = await CCSort.find({ _id: id })
  ctx.body = { code: 200, message: 'ok', data: doc }
})


ccsort.put('/:id', async (ctx) => {
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await CCSort.findByIdAndUpdate({_id: id}, body, { new: true })
  ctx.body = { code: 201, message: 'ok', data: result }
})

ccsort.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  const result = await CCSort.remove({ _id: id })
  ctx.body = { code: 201, message: 'ok', data: result }
})


module.exports = ccsort