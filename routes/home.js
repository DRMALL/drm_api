
var { host } = require('../config')

var home = (ctx) => {
  ctx.body = {
    host: host,
    hello: 'ssh2'
  }
}

module.exports = home