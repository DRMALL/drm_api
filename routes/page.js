
var Router = require('koa-router')

var page = new Router()
var host = 'https://newteo.com'

page.get('/', async (ctx) => {
  ctx.body = {
    page: 'page'
  }
})

module.exports = page