
import Bug from './model/Bug'

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.of('/socket').on('connection', socket => {

      socket.on('orderIsHandled', (name, fn) => {
        // console.log(name)
        Bug.find({}).exec((err, res) => {
          this.io.emit('some', { code: 200, message: 'ok', res})
        })
      })

    })
  }
}

module.exports = WebSocket