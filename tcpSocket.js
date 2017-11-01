
const logger = require('./utils/logger')
const net = require('net')
const verify_socket_token = require('./utils/verify_socket_token')

const transform_data = require('./tcp/transform_data')
const deviceId_find_db = require('./tcp/deviceId_find_db')
const save_to_db = require('./tcp/save_to_db')
const send_msg = require('./tcp/send_msg')
const to_app_data = require('./tcp/to_app_data')
const myEmitter = require('./tcp/emitter')
const redis = require('./redis_tcp')


let huancun = ''
let count = 0

const server = net.createServer()
server.on('connection', handleConnection);

server.listen(9000, function() {  
  console.log('server listening to %j', server.address());
})

function handleConnection(conn) {

  const remoteAddress = conn.remoteAddress + ':' + conn.remotePort
  // logger.info('new client connection from %s', remoteAddress)

  conn.on('data', onConnData)
  conn.once('close', onConnClose)
  conn.on('error', onConnError)

  conn.setEncoding('utf8')

  async function onConnData(d) {

    if(d.replace(/\$\$/g, '') !== d) {
      d = huancun + d.replace(/\$\$/g, '')
      huancun = ''
    } else {
      huancun += d
      return 
    }

    try {
      const normal_data = transform_data(d, conn)
      //console.log(normal_data)
      myEmitter.emit('coming', to_app_data(normal_data))
      const device_data = await deviceId_find_db(normal_data)
      if(device_data) {
          save_to_db(normal_data)
          send_msg(normal_data)
      } else {
        logger.info(`save failed: Didn't found this deviceId`)
        console.log(`Didn't found this deviceId`)
      }
    } catch(e) {
      console.error(e)
    }
    conn.write('NOP')
  }

  function onConnClose() {
    //logger.info('connection from %s closed %s times!', remoteAddress, count++);
  }

  function onConnError(err) {
    logger.info('Connection %s error: %s', remoteAddress, err.message);
  }
}

module.exports = server

