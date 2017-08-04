
var { host } = require('../config')

var home = (ctx) => {
  ctx.status = 200
  ctx.body = {
    host: host,
    admin: `${host}admin`,
    app: `${host}app`
  }
}

module.exports = home