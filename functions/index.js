const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'taurussoftwaredev@gmail.com',
        pass: 'T4urusD3v'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        const mailOptions = {
            from: 'PowerFi Site <taurussoftwaredev@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: 'aulus999@gmail.com, danrleywillian@gmail.com',
            subject: 'Email enviado pelo site Powerfi.eu', // email subject
            html: `<p style="font-size: 16px;"><b>Name: </b> `+ req.query.name +`</p>
                <br />
                <p style="font-size: 16px;"><b>Email: </b> `+ req.query.senderMail +`</p>
                <p style="font-size: 16px;"><b>Message: </b> `+ req.body.message +`</p>
                ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
