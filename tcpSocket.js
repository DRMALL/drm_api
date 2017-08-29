const logger = require('./uilts/logger')
const net = require('net')
const server = net.createServer()

server.listen(9000, handleConnection)

function handleConnection(conn) {
  const remoteAddress = conn.remoteAddress + ':' + conn.remotePort
  logger.info('new client connection from %s', remoteAddress)

  conn.on('data', onConnData)
  conn.once('close', onConnClose)
  conn.on('error', onConnError)

  conn.setEncoding('utf8')

  function onConnData(d) {
    logger.info('connection data from %s: %j', remoteAddress, d)
    conn.write(d)
  }

  function onConnClose() {
    logger.info('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    logger.info('Connection %s error: %s', remoteAddress, err.message);
  }


}

