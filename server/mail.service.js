module.exports = {
    sendEmail: sendEmail
};

function sendEmail (email, subject, message) {
    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.MAIL_SENDER, 
        to: email,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
        }
    });
}