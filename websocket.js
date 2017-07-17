import Admin from './controllers/Admin'

class WebSocket {

  constructor(io) {
    this.io = io
    this.init()
  }

  init() {
    this.io.on('connection', socket => {
      
      this.socket = socket
      this.emit = (event, data) => socket.emit(event, data)

      // console.log('there is connection')
      // const bugs = await Admin.getBugs()

      // socket.emit('newteo','bugs')

      // socket.on('order', (data) => {
      //   console.log(data)
      //   socket.broadcast.emit('do', { do: 'it'})
      // })


    })

    this.io.on('disconnect', socket => {
      console.log('disconnect')
      socket.disconnect()
    })

  }
}

module.exports = WebSocket