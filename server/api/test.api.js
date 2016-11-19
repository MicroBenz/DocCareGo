let smsService = require('../sms.service');
let mailService = require('../mail.service');

function getRemainCredit (req, res) {
    smsService.checkSMSCredit()
        .subscribe(
            (creditStatus) => {
                res.json({
                    success: true,
                    result: creditStatus
                });
            },
            (error) => {
                res.status(500).send({
                    success: false,
                    status: 500,
                    developerMessage: error,
                    userMessage: 'Can not get remaining credit'
                });
            }
        );
}

function sendSMS (req, res) {
    smsService.sendSMS('0813541423', 'เทส SMS')
        .subscribe(
            (success) => {
                console.log(success);
                res.json({
                    success: true,
                    result: success
                });
            },
            (error) => {
                res.status(500).send({
                    success: false,
                    status: 500,
                    developerMessage: error,
                    userMessage: 'Can not send SMS'
                });
            }
        )
}
function sendEmail (req, res) {
    mailService.sendEmail(
        'first852456@gmail.com',
        'เทส email',
        'ข้อความ naja'
    );
    res.json({
        success: true,
        clientMessage: 'send email completed'
    });
}

function getTest (req, res) {
    res.json({
        success: true,
        result: {
            message: 'This is get test.'
        }
    })
}

function getTestError (req, res) {
    res.status(500).send({
        success: false,
        status: 500,
        developerMessage: 'Put what cause error here',
        userMessage: 'Put error to show at front-end here'
    })
}

function getSearch (req, res) {
    setTimeout(function () {
        var personnelArr = [];
        if (req.query.search !== '') {
            personnelArr = [
                {
                    id: req.query.search,
                    name: 'ธนนันท์',
                    surname: 'ตั้งธนาชัยกุล',
                    role: 'staff'
                },
                {
                    id: req.query.search + '1',
                    name: 'ธีรัช',
                    surname: 'รักษ์เถา',
                    role: 'doctor'
                },
                {
                    id: req.query.search + '2',
                    name: 'ธนวัฒน์',
                    surname: 'เค้าฉลองเคียง',
                    role: 'patient'
                }
            ]
        }
        res.json({
            success: true,
            result: {
                personnel: personnelArr
            }
        })
    }, 1000);
}

module.exports = function (app, express) {
    var testRoutes = express.Router();
    testRoutes.get('/', getTest);
    testRoutes.get('/error', getTestError);
    testRoutes.get('/searchPersonnel', getSearch);
    testRoutes.get('/sms/checkCredit', getRemainCredit);
    testRoutes.post('/sms/sendSMS', sendSMS);    
    testRoutes.post('/email/sendEmail', sendEmail);    
    app.use('/test', testRoutes);
}