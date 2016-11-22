let request = require('request');
let sendSMSEndpoint = 'https://sms.gipsic.com/api/send';
let checkSMSCreditEndpoint = 'https://sms.gipsic.com/api/balance';
let Rx = require('rxjs/Rx');
require('dotenv').config();

// sender params can be: 
// DISCOUNT NOTICE OTP PRIVATE PROMOTION SMS SPECIAL VIP
function sendSMS (phoneNumber, message, sender = 'NOTICE') {
    let requestOption = {
        uri: sendSMSEndpoint,
        method: 'POST',
        form: {
            key: process.env.SMS_API,
            secret: process.env.SMS_SECRET,
            phone: phoneNumber,
            sender: sender,
            message: message
        }
    };
    return Rx.Observable.bindNodeCallback(request)(requestOption)
        .map(
            (response) => {
                return JSON.parse(response[0].body);
            }
        );
}

function checkSMSCredit () {
    let requestOption = {
        uri: checkSMSCreditEndpoint,
        method: 'GET',
        qs: {
            key: process.env.SMS_API,
            secret: process.env.SMS_SECRET
        }
    };
    return Rx.Observable.bindNodeCallback(request)(requestOption)
        .map(
            (response) => {
                return JSON.parse(response[0].body);
            }
        );
}

module.exports = {
    sendSMS: sendSMS,
    checkSMSCredit: checkSMSCredit
};