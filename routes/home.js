
var { host } = require('../config')
const logger = require('koa-log4').getLogger('home')


var home = (ctx) => {
  ctx.body = {
    host: host,
    admin: `${host}admin`,
    app: `${host}app`
  }
}

module.exports = home