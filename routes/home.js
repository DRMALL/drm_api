
var { host } = require('../config')

var home = (ctx) => {
  ctx.body = {
    host: host,
    users: `${host}users`,
    devices: `${host}devices`,
    news: `${host}news`,
    bugs: `${host}bugs`,
    orders: `${host}orders`,
  }
}

module.exports = home