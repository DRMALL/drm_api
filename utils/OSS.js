const multer = require('multer')
  , AliOSS = require('ali-oss')
  , co = require('co')
  , region = process.env.REGION
  , accessKeyId = process.env.ACCESSKEYID
  , accessKeySecret = process.env.ACCESSKEYSECRET
  , bucket = process.env.BUCKET

class OSS {
  constructor() {
    this.client = new AliOSS({
      region: region,
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      bucket: bucket,
      // endpoint: 'https://',
    })
    this.region = region
    this.bucket = bucket
  }

  uploadMulter(single, ctx) {
    const client = this.client
    var upload = multer({ storage: multer.diskStorage({}) }).single(single)
    var uploadmul = new Promise((resolve, reject)=> {
      upload(ctx.req, ctx.res, (err)=> {
        if(err) return reject(JSON.stringify(err))
        // if(ctx.req.file.fieldname !== single) return resolve({key: ctx.req.file.fieldname})
        var fileName = Date.now() + '_' + ctx.req.file.originalname
        co(function* () {
          var result = yield client.put(`${single}/${fileName}`, ctx.req.file.path)
          if(result.res && result.res.statusCode === 200) {
            var signUrl = client.signatureUrl(`${single}/${fileName}`, {expires: 28800, process: 'image/resize,p_80/quality,Q_80'})
            var pubResult = yield client.get(`${single}/${fileName}`, `./static/example-cascade.jpg`, 
                                {process: 'image/resize,p_80/quality,Q_80'})
            if(pubResult.res  && pubResult.res.statusCode === 200) {
              resolve ({
                signUrl: signUrl,
                pubUrl: pubResult.res.requestUrls[0],
              })
            }
          } else resolve(result)
        }).catch( (err)=> {
          console.log(err)
        })
      })
    })
    return uploadmul
  }

  uploadMulters(single, ctx) {
    const client = this.client
    var uploads = multer({ storage: multer.diskStorage({}) }).array(single, 10)
    var uploadsmul = new Promise((resolve, reject)=> {
      uploads(ctx.req, ctx.res, (err)=> {
        if(err) return reject(JSON.stringify(err))
        var urlArr = []
        if(ctx.req.files[0]) {
          ctx.req.files.forEach((fileItem, index)=> {
            setTimeout(()=> {
              co(function* () {
                var fileName = Date.now() + '_' + fileItem.originalname
                var result = yield client.put(`${single}/${fileName}`, fileItem.path)
                if(result.res && result.res.statusCode === 200) {
                  var pubResult = yield client.get(`${single}/${fileName}`, `./static/example-cascade.jpg`, 
                                  {process: 'image/resize,p_80/quality,Q_80'})
                  if(pubResult.res && pubResult.res.statusCode === 200) urlArr.push(pubResult.res.requestUrls[0])
                  if(index == (ctx.req.files.length - 1) ) resolve(urlArr)
                }
              }).catch( (err)=> {
                console.log(err)
              })
            }, 500*index)
          })
        } else resolve(null)
      })
    })
    return uploadsmul
  }

  uploadMulterSign(single, ctx) {
    const client = this.client
    var upload = multer({ storage: multer.diskStorage({}) }).single(single)
    var uploadmul = new Promise((resolve, reject)=> {
      upload(ctx.req, ctx.res, (err)=> {
        if(err) return reject(JSON.stringify(err))
        // if(ctx.req.file.fieldname !== single) return resolve({key: ctx.req.file.fieldname})
        var fileName = Date.now() + '_' + ctx.req.file.originalname
        co(function* () {
          var result = yield client.put(`${single}/${fileName}`, ctx.req.file.path)
          if(result.res && result.res.statusCode === 200) {
            var signUrl = client.signatureUrl(`${single}/${fileName}`, {expires: 28800, process: 'image/resize,p_80/quality,Q_80'})
            resolve ({
              signUrl: signUrl,
              pubUrl: result.url,
            })
          } else resolve(result)
        }).catch( (err)=> {
          console.log(err)
        })
      })
    })
    return uploadmul
  }

  uploadMultersSign(single, ctx) {
    const client = this.client
    var uploads = multer({ storage: multer.diskStorage({}) }).array(single, 10)
    var uploadsmul = new Promise((resolve, reject)=> {
      uploads(ctx.req, ctx.res, (err)=> {
        if(err) return reject(JSON.stringify(err))
        var urlArr = []
        if(ctx.req.files[0]) {
          ctx.req.files.map((fileItem, index)=> {
            co(function* () {
              // if(ctx.req.file.fieldname !== single) return resolve({key: ctx.req.file.fieldname})
              var fileName = Date.now() + '_' + fileItem.originalname
              var result = yield client.put(`${single}/${fileName}`, fileItem.path)
              if(result.res && result.res.statusCode === 200) {
                var signUrl = client.signatureUrl(`${single}/${fileName}`, {expires: 28800, process: 'image/resize,p_80/quality,Q_80'})
                // console.log ({ signUrl: signUrl, pubUrl: result.url, })
                urlArr.push(signUrl)
                if(index == (ctx.req.files.length - 1) ) resolve(urlArr)
              }
            }).catch( (err)=> {
              console.log(err)
            })
          })
        } else resolve(null)
      })
    })
    return uploadsmul
  }

  delete(url) {
    const client = this.client
      , urlDoma = `http://${this.bucket}.${this.region}.aliyuncs.com/`
      , urlDomaLength = urlDoma.split('').length
    var objKey = decodeURIComponent(url.split('?')[0].substring(urlDomaLength))
    var delone = new Promise((resolve, reject)=> {
      co(function* () {
      var result = yield client.delete(objKey)
        if(result.res && result.res.statusCode === 204) {
          resolve({del: true})
        } else resolve(result)
      }).catch(function (err) {
        console.log(err)
      })
    })
    return delone
  }
}

module.exports = OSS
