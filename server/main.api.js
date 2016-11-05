module.exports = function (app, express) {
    var apiRoutes = express.Router();

    // Require other API Here by using apiRoutes
    // See example in test.api.js
    require('./api/auth.api')(app, express);
    require('./api/test.api')(apiRoutes, express);
    require('./api/appointment.api')(apiRoutes, express);
    require('./api/clinic.api')(apiRoutes, express);
    require('./api/diagnosisResult.api')(apiRoutes, express);
    require('./api/disease.api')(apiRoutes, express);
    require('./api/medicine.api')(apiRoutes, express);
    require('./api/nurse.api')(apiRoutes, express);
    require('./api/patient.api')(apiRoutes, express);
    require('./api/patientRecord.api')(apiRoutes, express);
    require('./api/pharmacist.api')(apiRoutes, express);
    require('./api/staff.api')(apiRoutes, express);
    require('./api/user.api')(apiRoutes, express);
    require('./api/workday.api')(apiRoutes, express);
    require('seeder.api')(app, express);
    app.use('/api/v1', apiRoutes);
};