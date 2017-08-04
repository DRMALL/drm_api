require('babel-core/register');
require('babel-polyfill');

const Koa = require('koa')
    , app = new Koa()
    , bodyParser = require('koa-bodyparser')
    , path = require('path')
    , router = require('./routes')
    , db = require('./db')
    , cors = require('koa2-cors')
    , static = require('koa-static')
    , WebSocket = require('./websocket')
    , staticPath = './static'
//     , log4js = require('koa-log4')

// require('./log')
// const logger = log4js.getLogger('app')


// app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto'}))

app.use(static(path.join( __dirname, staticPath)))
app.use(cors())

var server = require('http').Server(app.callback())
var io = require('socket.io')(server)

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


new WebSocket(io)



// for test case
module.exports = app

server.listen(3000)
console.log('[drm] start-quick is starting at port 3000')

