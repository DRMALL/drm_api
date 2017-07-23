
import Bug from './model/Bug'
import Order from './model/Order'

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.of('/socket').on('connection', socket => {

      socket.on('orderIsHandled', (id, fn) => {
        console.log(id)
        Order.find({_id: id}).exec((err, res) => {
          if(err) console.error(err) 
          this.io.emit('orderNotice', { code: 200, message: 'ok', data: res })
        })
      })

    })
  }
}

module.exports = WebSocket