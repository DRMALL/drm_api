const fs = require('fs')
const DevMoniter = require('./model/DevMoniter')
const DataGraph = require('./model/DataGraph')
const Device = require('./model/Device')
const Order = require('./model/Order')
const News = require('./model/News')
const OSS = require('./utils/OSS')
  , oss = new OSS()
  , region = process.env.REGION
  , bucket = process.env.BUCKET

const filePath = 'static/upload/'

// async function isChange() {
//   const devices = await Device.find()
//   devices.map((device, devIndex)=> {
//     var arr = []
//       , sums = 0
//     setTimeout(async ()=> {
//       await device.images.forEach((pic, index)=> {
//         setTimeout(async ()=> {
//           if(pic.url.split('https://api.wardenger.me/upload/').length > 1) {
//             var path = filePath + pic.url.split('https://api.wardenger.me/upload/')[1]
//             const result = await oss.uploadLocal('upload', path)
//             if(result.pubUrl) {
//               arr.push({
//                 uid: `-${index}`,
//                 url: pic.url.replace(/https:\/\/api\.wardenger\.me\/upload\//g, `http://${bucket}.${region}.aliyuncs.com/upload/`),
//                 status: 'done',
//               })
//             }
//           } else {
//             arr.push({
//               uid: `-${index}`,
//               url: pic.url,
//               status: 'done',
//             })
//           }
//           if(sums == (device.images.length - 1)) {
//             changeDataToDB(device._id, arr)
//           }
//           sums += 1
//         }, 300*index)
//       })
//     }, 1500*devIndex)
//   })
// }

// async function changeDataToDB(id, arr) {
//   const newdevice = await Device.findOneAndUpdate({ _id: id }, {$set: { images: arr }}, { new: true })
//   if(newdevice) console.log('true')
//   else console.log('false')
// }

// isChange()

async function isChange() {
  const orders = await Order.find()
  orders.map((order, devIndex)=> {
    var arr = []
      , sums = 0
    setTimeout(async ()=> {
      await order.images.forEach((pic, index)=> {
        setTimeout(async ()=> {
          if(pic.url.split('https://api.wardenger.me/upload/').length > 1) {
            var path = filePath + pic.url.split('https://api.wardenger.me/upload/')[1]
            const result = await oss.uploadLocal('upload', path)
            if(result.pubUrl) {
              arr.push({
                _id: pic._id,
                url: pic.url.replace(/https:\/\/api\.wardenger\.me\/upload\//g, `http://${bucket}.${region}.aliyuncs.com/upload/`),
              })
            }
          } else {
            arr.push({
              _id: pic._id,
              url: pic.url,
            })
          }
          if(sums == (order.images.length - 1)) {
            changeDataToDB(order._id, arr)
          }
          sums += 1
        }, 300*index)
      })
    }, 1500*devIndex)
  })
}

async function changeDataToDB(id, arr) {
  const neworders = await Order.findOneAndUpdate({ _id: id }, {$set: { images: arr }}, { new: true })
  if(neworders) console.log('true')
  else console.log('false')
}

isChange()

// async function isChange() {
//   const news = await News.find()
//   news.map((newsone, devIndex)=> {
//     var arr = []
//       , sums = 0
//     setTimeout(async ()=> {
//       await newsone.images.forEach((pic, index)=> {
//         setTimeout(async ()=> {
//           if(pic.url.split('https://api.wardenger.me/upload/').length > 1) {
//             var path = filePath + pic.url.split('https://api.wardenger.me/upload/')[1]
//             const result = await oss.uploadLocal('upload', path)
//             if(result.pubUrl) {
//               arr.push({
//                 _id: pic._id,
//                 url: pic.url.replace(/https:\/\/api\.wardenger\.me\/upload\//g, `http://${bucket}.${region}.aliyuncs.com/upload/`),
//               })
//             }
//           } else {
            // arr.push({
            //   _id: pic._id,
            //   url: pic.url,
            // })
//           }
//           if(sums == (newsone.images.length - 1)) {
//             changeDataToDB(newsone._id, arr)
//           }
//           sums += 1
//         }, 300*index)
//       })
//     }, 1500*devIndex)
//   })
// }

// async function changeDataToDB(id, arr) {
//   const newnews = await News.findOneAndUpdate({ _id: id }, {$set: { images: arr }}, { new: true })
//   if(newnews) console.log('true')
//   else console.log('false')
// }

// isChange()


