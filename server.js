require('babel-core/register');
require('babel-polyfill');

const Koa = require('koa')
    , app = new Koa()
    , bodyParser = require('koa-bodyparser')
    , path = require('path')
    , logger = require('koa-logger')
    , router = require('./routes')
    , db = require('./db')
    , cors = require('koa2-cors')
    , static = require('koa-static')
    , staticPath = './static'


app.use(static(path.join( __dirname, staticPath)))

app.use(cors())
app.use(logger())


app.use(bodyParser())
app.use(router.routes())
   .use(router.allowedMethods())


module.exports = app

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

