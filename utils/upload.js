const Busboy = require('busboy');
const inspect = require('util').inspect;
const fs = require('fs');
const path = require('path');
const host = require('../config').host

exports.busboys = (ctx, options = {}) => {
    // 配置
    options = Object.assign(options, {
        uploadDir: './upload',
        publicDir: './static',
    })

    function mkdirsSync( dirname ) {
      if (fs.existsSync( dirname )) {
        return true
      } else {
        if (mkdirsSync( path.dirname(dirname)) ) {
          fs.mkdirSync( dirname )
          return true
        }
      }
    }

    // 创建目录
    mkdirsSync(path.join(options.publicDir, options.uploadDir))

    return new Promise((resolve, reject) => {
        const busboy = new Busboy({ 
            headers: ctx.req.headers,
            limits: {
                fieldSize: 1028 * 1028 * 10
            }
        });
        let name = '';
        let fieldname = ''
        let result = []

        // 监听文件解析事件
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

            name = Date.now() + '_' + path.basename(filename);
            // fieldname = fieldname

            console.log(`File [${fieldname}] 文件名: ${filename}`, `mimetype: ${mimetype}` );

            // 通过管道的方式，把文件流保存到特定路径

            file.pipe(fs.createWriteStream(
                path.join(options.publicDir, options.uploadDir, name)
            ));

            // 开始解析文件流
            file.on('data', (data) => {
                console.log(`File [${fieldname}] 已上传 ${data.length} bytes`);
            });

            // 解析文件结束
            file.on('end', () => {
                console.log(`File [${fieldname}] 上传结束`);
                resolve({
                    name: name,
                    success: true,
                    fieldname: fieldname,
                    file: `${host}${path.join(options.uploadDir, name)}`,
                });
            });
        });

        // 监听请求中的字段
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
            console.log(`Field [${fieldname}]: value: ${inspect(val)}`);
        });

        // 监听结束事件
        busboy.on('finish', function () {
            console.log('Done parsing form!');

            resolve({
                name: name,
                success: true,
                fieldname: fieldname,
                file: `${host}${path.join(options.uploadDir, name)}`,
            });
        });

        // 解析错误事件
        busboy.on('error', function (err) {
            reject({
                success: false,
                file: null,
            });
        });

        // 流
        ctx.req.pipe(busboy);
    });
};
