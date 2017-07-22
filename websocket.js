
import Bug from './model/Bug'

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.of('/socket').on('connection', socket => {

      socket.on('newteo', (name, fn) => {
          Bug.find({}).exec((err, res) => {
              fn(res)
          })
      })

      socket.join('room 233', () => {
          let rooms = Object.keys(socket.rooms)
      })

    })
  }
}

module.exports = WebSocket