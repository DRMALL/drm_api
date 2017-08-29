const Router = require('koa-router')
const timeline = new Router()
const TimeLine = require('../model/TimeLine')

timeline.post('/', async (ctx) => {
  const { text } = ctx.request.body
  if(!text) {
    return ctx.body = { code: 400, message: '缺少必要的参数text', data: '' }
  }
  const doc = await TimeLine.create({ text })
  ctx.body = { code: 201, message: 'ok', data: doc }
})


timeline.get('/', async (ctx) => {
  const docs = await TimeLine.find({})
  ctx.body = { code: 200, message: 'ok', data: docs }
})


timeline.get('/:id', async (ctx) => {
  const id = ctx.params.id
  const docs = await TimeLine.find({ _id: id })
  ctx.body = { code: 200, message: 'ok', data: docs }
})


timeline.put('/:id', async (ctx) => {
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await TimeLine.findByIdAndUpdate({_id: id}, body, { new: true })
  ctx.body = { code: 201, message: 'ok', data: result }
})

timeline.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  const result = await TimeLine.remove({ _id: id })
  ctx.body = { code: 201, message: 'ok', data: result }
})


module.exports = timeline