require('babel-core/register');
require('babel-polyfill');

const Koa = require('koa')
    , app = new Koa()
    , bodyParser = require('koa-bodyparser')
    , logger = require('koa-logger')
    , router = require('./routes')
    , db = require('./db')
    , cors = require('koa2-cors')


app.use(cors())
app.use(logger())


app.use(bodyParser())
app.use(router.routes())
   .use(router.allowedMethods())



app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

