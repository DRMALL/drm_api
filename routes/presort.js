
const Router = require('koa-router')
const presort = new Router()
const PreSort = require('../model/PreSort')

presort.post('/', async (ctx) => {
  const { text } = ctx.request.body
  if(!text) {
    return ctx.body = { code: 400, message: '缺少必要的参数text', data: '' }
  }
  const doc = await PreSort.create({ text })
  ctx.body = { code: 201, message: 'ok', data: doc }
})


presort.get('/', async (ctx) => {
  const docs = await PreSort.find({})
  ctx.body = { code: 200, message: 'ok', data: docs }
})


presort.get('/:id', async (ctx) => {
  const id = ctx.params.id
  const doc = await PreSort.find({ _id: id })
  ctx.body = { code: 200, message: 'ok', data: doc }
})


presort.put('/:id', async (ctx) => {
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await PreSort.findByIdAndUpdate({_id: id}, body, { new: true })
  ctx.body = { code: 201, message: 'ok', data: result }
})

presort.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  const result = await PreSort.remove({ _id: id })
  ctx.body = { code: 201, message: 'ok', data: result }
})


module.exports = presort