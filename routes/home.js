
var { host } = require('../config')

var home = (ctx) => {
  console.log(ctx.newteo)
  ctx.body = {
    host: host,
    hello: 'ssh2',
    middware: 'ctx.newteo'
  }
}

module.exports = home