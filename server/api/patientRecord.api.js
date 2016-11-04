module.exports = function (apiRoutes, express) {
    var patientRecordRoutes = express.Router();    
    var PatientRecord = require('../model/PatientRecord.js');
    var Appointment = require('../model/Appointment.js');
    var utils = require('../utils.js');

    patientRecordRoutes.use(function (req, res, next) {
        if (req.decoded.role !== 'nurse') {
            res.status(400).send({
                status: 'Bad Request',
                message: 'This API is not allowed for your role.'
            });
        }
        next();
    });

    patientRecordRoutes.route('/')
        .get(getPatientRecords)
        .post(createPatientRecord)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    patientRecordRoutes.route('/:id')
        .get(getPatientRecordById)
        .post(utils.methodNotAllowed)
        .put(updatePatientRecordById)
        .delete(utils.methodNotAllowed);

    patientRecordRoutes.use('/patientRecords', doctorRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getPatientRecords (req, res) {
        var appointmentsRef;
        Workday.find({
            date: moment().toDate();
        })
        .then(
            function (workdays) {
                return Appointment.find({
                    workday: {
                        $in: workdays
                    }
                });
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get workday data.'
                });
            }
        )
        .then(
            function (appointments) {
                appointmentsRef = appointments;
                return PatientRecord.find({
                    appointment: {
                        $in: appointments
                    }
                });
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get appointment data.'
                });
            }
        )
        .then(
            function (patientRecords) {
                for each (appointment in appointmentsRef) {
                    for each (patientRecord in patientRecords) {
                        if( appointment._id === patientRecord.appointment) {
                            appointment.patientRecord = patientRecord;
                        }
                        else {
                            appointment.patientRecord = {};
                        }
                    }
                }
                return appointmentsRef;
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patientRecord data.'
                });
            }
        )
        .then(
            function (appointments) {
                res.json({
                    success: true,
                    data: appointments
                });
            }
        )
    }

    //----------------- POST (CREATE) -----------------
    function createPatientRecord (req, res) {
        validateField(res, req.body);
        PatientRecord.findOne({
            appointment: req.body.appointment
        })
        .then(
            function (patientRecord) {
                if (patientRecord) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This patientRecord has already in the system'
                    });
                    mongoose.Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patientRecord data.'
                });
            }
        )
        .then(
            function (){
                return {
                    appointment: req.body.appointment,
                    weight: req.body.weight,
                    height: req.body.height,
                    temperature: req.body.temperature,
                    heartRate: req.body.heartRate,
                    systolic: req.body.systolic,
                    diastolic: req.body.diastolic,
                };
            }
        )
        .then(
            function (patientRecordData) {
                var patientRecord = new PatientRecord(patientRecordData);
                return patientRecord.save();
            }
        )
        .then(
            function (patientRecord) {
                res.json({
                    success: true,
                    clientMessage: 'Create PatientRecord succeed',
                    data: patientRecord
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create PatientRecord failed',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.appointment) {
            utils.responseMissingField(res, 'appointment');
        }

        if (!body.weight) {
            utils.responseMissingField(res, 'weight');
        }
            
        if (!body.height) {
            utils.responseMissingField(res, 'height');
        }
            
        if (!body.temperature) {
            utils.responseMissingField(res, 'temperature');
        }

        if (!body.heartRate) {
            utils.responseMissingField(res, 'heartRate');
        }

        if (!body.systolic) {
            utils.responseMissingField(res, 'systolic');
        }

        if (!body.diastolic) {
            utils.responseMissingField(res, 'diastolic');
        }
    }
}