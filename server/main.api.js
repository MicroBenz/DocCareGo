module.exports = function (app, express) {
    var apiRoutes = express.Router();

    // Require other API Here by using apiRoutes
    // See example in test.api.js
    require('./api/auth.api')(app, express);
    require('./api/test.api')(apiRoutes, express);
    app.use('/api/v1', apiRoutes);
};