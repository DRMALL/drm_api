
var Router = require('koa-router')

var home = new Router()
var host = 'https://newteo.com'

home.get('/', async (ctx) => {
  ctx.body = {
    page: `${host}/page`,
    post: `${host}/post`
  }
})

module.exports = home
