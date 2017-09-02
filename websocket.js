
const Bug = require('./model/Bug')
const Order = require('./model/Order')
const myEmitter = require('./tcp/emitter')

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.of('/socket').on('connection', socket => {


      myEmitter.on('coming', (normal_data) => {
        socket.emit('news', normal_data);
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