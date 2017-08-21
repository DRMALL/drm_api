
const Router = require('koa-router')
const adminNew = new Router()

adminNew.get('/uploadimg', ctx => {

  // const upload = await busboys (ctx)
  // if(upload.fieldname !== 'news')
  //   return ctx.body = { code: 400, message: '参数值错误, key: news', data: '' }
  // if(!upload.success)
  //   return ctx.body = { code: 501, message: '上传文件失败', data: upload }
  // ctx.body = { code: 201, message: '上传成功', data: { url: upload.file } }})

})
module.exports = adminNew