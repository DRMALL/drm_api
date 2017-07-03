
const Router = require('koa-router')

const query = new Router()

query.get('/', async (ctx) => {
  var query = ctx.query
  var querystring = ctx.querystring
  ctx.body = {
    query: query,
    querystring: querystring
  }
})

module.exports = query
