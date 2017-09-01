
const logger = require('./utils/logger')
const net = require('net')
const verify_socket_token = require('./utils/verify_socket_token')



const server = net.createServer()
server.on('connection', handleConnection);

server.listen(9000, function() {  
  console.log('server listening to %j', server.address());
})

function handleConnection(conn) {

  const remoteAddress = conn.remoteAddress + ':' + conn.remotePort
  logger.info('new client connection from %s', remoteAddress)

  conn.on('data', onConnData)
  conn.once('close', onConnClose)
  conn.on('error', onConnError)

  conn.setEncoding('utf8')

  function onConnData(d) {
    logger.info('connection data from %s: %j', remoteAddress, d)
    logger.info('DRM_DATA:', d)
    conn.write(d)
    // const result = verify_socket_token(d)
    // if(result.status) {
    //   conn.write(d)
    // }
    // else {
    //   conn.write('BYE')
    // }
  }

  function onConnClose() {
    logger.info('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    logger.info('Connection %s error: %s', remoteAddress, err.message);
  }
}

module.exports = server

