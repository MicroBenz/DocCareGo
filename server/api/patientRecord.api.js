module.exports = function (apiRoutes, express) {
    var patientRecordRoutes = express.Router();    
    var PatientRecord = require('../model/PatientRecord.js');
    var Appointment = require('../model/Appointment.js');
    var utils = require('../utils.js');
    var moment = require('moment');

    patientRecordRoutes.route('/')
        .get(getPatientRecords)
        .post(createPatientRecord)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    patientRecordRoutes.route('/:appointment')
        .get(getPatientRecordByAppointment)
        .post(utils.methodNotAllowed)
        .put(updatePatientRecordByAppointment)
        .delete(utils.methodNotAllowed);

    patientRecordRoutes.use('/patientRecords', patientRecordRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getPatientRecords (req, res) {
        utils.checkRole(req, res, ['nurse']);
        var appointmentsRef;
        Workday.find({
            date: moment().toDate()
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
                appointmentsRef = appointments.toObject();
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
                appointmentsRef.forEach(function(appointment){ 
                    patientRecords.forEach(function(patientRecord) {
                        if( appointment._id === patientRecord.appointment) {
                            appointment.patientRecord = patientRecord;
                        }
                        else {
                            appointment.patientRecord = null;
                        }
                    });
                });
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

    function getPatientRecordByAppointment (req, res) {
        utils.checkRole(req, res, ['nurse','doctor']);
        PatientRecord.findOne({
            appointment: req.params.appointment
        })
        .populate('appointment')
        .then(
            function (patientRecord) {
                if (!patientRecord) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No patientRecord with this appointmentId.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: patientRecord
                    });
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
        );
    }

    //----------------- POST (CREATE) -----------------
    function createPatientRecord (req, res) {
        utils.checkRole(req, res, ['nurse']);
        if (!body.appointment) {
            utils.responseMissingField(res, 'appointment');
        }
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
                    Promise.reject(400);
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

    //----------------- PUT (UPDATE) -----------------
    function updatePatientRecordByAppointment (req, res) {
        utils.checkRole(req, res, ['nurse']);
        validateField(res, req.body);
        PatientRecord.findOne({
            appointment: req.params.appointment
        })
        .then(
            function (patientRecord) {
                if (patientRecord) {
                    patientRecord.weight = req.body.weight;
                    patientRecord.height = req.body.height;
                    patientRecord.temperature = req.body.temperature;
                    patientRecord.heartRate = req.body.heartRate;
                    patientRecord.systolic = req.body.systolic;
                    patientRecord.diastolic = req.body.diastolic;
                    return patientRecord.save();
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No patientRecord with this appointment.'
                    });
                    Promise.reject(400);
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
            function (patientRecord) {
                res.json({
                    success: true,
                    clientMessage: 'Update patientRecord succeed',
                    data: patientRecord
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update patientRecord failed',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
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