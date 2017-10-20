require('dotenv').config()

const Koa = require('koa')
    , app = new Koa()
    , koaBody = require('koa-body')({
        "formLimit":"5mb",
        "jsonLimit":"5mb",
        "textLimit":"5mb"
    })
    , path = require('path')
    , router = require('./routes')
    , db = require('./db')
    , cors = require('koa2-cors')
    , static = require('koa-static')
    , WebSocket = require('./websocket')
    , staticPath = './static'
    , tcpSocket = require('./tcpSocket')
    , redis = require('./redis')
    

app.use(static(path.join( __dirname, staticPath)))
app.use(cors())

var server = require('http').Server(app.callback())
var io = require('socket.io')(server)
app.use(koaBody)
app.use(router.routes())
app.use(router.allowedMethods())

// require('./changeFilePath')

new WebSocket(io)

//for test case
module.exports = app

server.listen(3000)
console.log('[drm] start-quick is starting at port 3000')

