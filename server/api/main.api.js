module.exports = function (app, express) {
    var apiRoutes = express.Router();

    // Require other API Here by using apiRoutes
    require('./auth.api')(app, express);
    app.use('/api/v1', apiRoutes);
};