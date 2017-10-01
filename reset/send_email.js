
'use strict';

const nodemailer = require('nodemailer');
  , userEmail = process.env.USEREMAIL
  , passEmail = process.env.PASSEMAIL
  , emailHost = process.env.EMAILHOST


module.exports = (email, nonstr) => {

  let account = {
    user: userEmail,
    pass: passEmail
  }

  let transporter = nodemailer.createTransport({
        host: emailHost,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
  });

  let mailOptions = {
        from: userEmail, // sender address
        to: `${email}`, // list of receivers
        subject: '重置密码', // Subject line
        text: '有效期5分钟', // plain text body
        html: `<b>你的验证码是：</b><b>${nonstr}</b><p>有效期5分钟</p>` // html body
        // attachments: [{
        //     filename: 'img.png',
        //     path: ''
        // }
        // ]
  };

  return () => new Promise((resolve, reject) => {


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject(error)
            return console.log(error);
        }
        resolve(info)
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

  })







}
