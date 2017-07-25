
var { host } = require('../config')

var home = (ctx) => {
  ctx.body = {
    host: host,
    users: `${host}admin/users`,
    devices: `${host}admin/devices`,
    news: `${host}admin/news`,
    bugs: `${host}admin/bugs`,
    orders: `${host}admin/orders`,
  }
}

module.exports = home