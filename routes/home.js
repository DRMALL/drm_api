
const { host } = require('../config')

const home = (ctx) => {
  ctx.body = {
    host: host,
    admin: `${host}admin`,
    app: `${host}app`
  }
}

module.exports = home