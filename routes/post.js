
var Router = require('koa-router')

var post = new Router()

post.get('/', async (ctx) => {
  ctx.body = {
    post: 'post'
  }
})

module.exports = post