
const logger = require('./utils/logger')
const net = require('net')
const verify_socket_token = require('./utils/verify_socket_token')

const transform_data = require('./tcp/transform_data')
const verify_source = require('./tcp/verify_source')
const deviceId_find_db = require('./tcp/deviceId_find_db')
const save_to_db = require('./tcp/save_to_db')
const to_app_data = require('./tcp/to_app_data')
const myEmitter = require('./tcp/emitter')
const redis = require('./redis_tcp')


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
    // logger.info('connection data from %s: %j', remoteAddress, d)
    // logger.info('DRM_DATA:', d)
    // logger.info('DRM_DATA:', transform_data(d))

    const dataSource = verify_source(d)

    if(dataSource === 'hardware') {
      try {
        const normal_data = transform_data(d, conn)
        console.log(normal_data)
        const device_data = await deviceId_find_db(normal_data)
        if(device_data) {

          // setTimeout(() => {
          const now_data = normal_data
          save_to_db(now_data)
          myEmitter.emit('coming', to_app_data(now_data))
          // }, 1000*1 )
        } else {
          logger.info(`save failed: Didn't found this deviceId`)
          console.log(`Didn't found this deviceId`)
          // conn.write('NONOP')
        }
      } catch(e) {
        console.error(e)
      }
      conn.write('NOP')
    }

    if(dataSource === 'app') {

    }
  }

  function onConnClose() {
    logger.info('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    logger.info('Connection %s error: %s', remoteAddress, err.message);
  }
}

module.exports = server

