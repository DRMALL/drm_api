

var Router = require('koa-router')
var home = require('./home')
var page = require('./page')
var post = require('./post')
var query = require('./query')
var router = new Router()


router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())
router.use('/query', query.routes(), query.allowedMethods())


module.exports = router