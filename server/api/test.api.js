module.exports = function (apiRoutes, express) {
    var testRoutes = express.Router();
    testRoutes.get('/', getTest);
    testRoutes.get('/error', getTestError);
 
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