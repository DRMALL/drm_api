
var { host } = require('../config')

var home = (ctx) => {
  ctx.body = {
    host: host
  }
}

module.exports = home