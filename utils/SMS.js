// require('dotenv').config()
const SMSClient = require('@alicloud/sms-sdk')

const { SMS_ACCESS_KEY_SECRET, SMS_ACCESS_KEY_ID } = process.env

let smsClient = new SMSClient({
  accessKeyId: SMS_ACCESS_KEY_ID,
  secretAccessKey: SMS_ACCESS_KEY_SECRET
})

module.exports = async (phone, name, msg) => {
  const obj = {
    PhoneNumbers: phone,
    SignName: '阿里云短信测试专用',
    TemplateCode: 'SMS_106955161',
    TemplateParam: `{"deviceid":"『${name}』","alertinfo":"『${msg}』"}`
  }

  const result = await smsClient.sendSMS(obj)
}

