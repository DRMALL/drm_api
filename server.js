
const Koa = require('Koa')
    , bodyParser = require('koa-bodyparser')

    , router = require('./routes')

    , app = new Koa()


app.use(router.routes()).use(router.allowedMethods())
app.use(bodyParser())


app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

