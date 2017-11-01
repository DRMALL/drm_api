require('dotenv').config()
const SMSClient = require('@alicloud/sms-sdk')

const { SMS_ACCESS_KEY_SECRET, SMS_ACCESS_KEY_ID } = process.env

let smsClient = new SMSClient({
  accessKeyId: SMS_ACCESS_KEY_ID,
  secretAccessKey: SMS_ACCESS_KEY_SECRET
})

const obj = {
    PhoneNumbers: '13911829017',
    SignName: '阿里云短信测试专用',
    TemplateCode: 'SMS_106955161',
    TemplateParam: '{"deviceid":"『王 eight eggs 老板』","alertinfo":"『带着小姨子跑路！』"}'
}

smsClient.sendSMS(obj)
  .then(res => {
     if (res.Code === 'OK') {
        console.log(res)
     }
  })
  .catch(err => console.log(err))

// async function sendSMS(obj) {
//   const sms = await smsClient.sendSMS(obj)
// }

// sendSMS(obj)
