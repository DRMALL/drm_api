
const Bug = require('./model/Bug')
const Order = require('./model/Order')
const myEmitter = require('./tcp/emitter')

var sendEndNews = ''

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.of('/socket').on('connection', socket => {


      myEmitter.on('coming', (app_data) => {
        if(typeof sendEndNews == 'object') {
          console.log('clearTimeout')
          clearTimeout(sendEndNews)
        }
        socket.emit('news', app_data)
        sendEndNews = setTimeout(() => {
          socket.emit('news', {number: '', ts: new Date().getTime(), data: []} )
        }, 1000 * 60 )
      })

      myEmitter.on('orderNotice', (noticeResult) => {
        socket.emit('orderNotice', noticeResult)
      })


      socket.on('orderIsHandled', (id, fn) => {
        console.log(id)
        // Order.find({_id: id}).exec((err, res) => {
        //   if(err) console.error(err) 
        //   this.io.emit('orderNotice', { code: 200, message: 'ok', data: res })
        // })
      })

    })
  }
}

module.exports = WebSocket