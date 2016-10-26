module.exports = function (apiRoutes, express) {
    var testRoutes = express.Router();
    testRoutes.get('/', getTest);
    testRoutes.get('/error', getTestError);
    testRoutes.get('/searchPersonnel', getSearch);

    apiRoutes.use('/test', testRoutes);
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