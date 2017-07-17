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
    , WebSocket = require('./websocket')
    , staticPath = './static'


app.use(static(path.join( __dirname, staticPath)))


app.use(cors())
app.use(logger())

// app.use(socket())



var server = require('http').Server(app.callback())
var io = require('socket.io')(server)



app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


const socket = new WebSocket(io)

app.use((ctx, next) => {
    ctx.socket = socket
    return next()
})


// for test case
module.exports = app

server.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

