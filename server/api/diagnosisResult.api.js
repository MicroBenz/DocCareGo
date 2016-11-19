module.exports = function (apiRoutes, express) {
    var diagnosisResultRoutes = express.Router();    
    var DiagnosisResult = require('../model/DiagnosisResult.js');
    var Appointment = require('../model/Appointment.js');
    var Disease = require('../model/Disease.js');
    var Medicine = require('../model/Medicine.js');
    var utils = require('../utils.js');
    var moment = require('moment');

    diagnosisResultRoutes.route('/')
        .get(getDiagnosisResults)
        .post(createDiagnosisResult)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    diagnosisResultRoutes.route('/:appointment')
        .get(getDiagnosisResultByAppointment)
        .post(utils.methodNotAllowed)
        .put(updateDiagnosisResultByAppointment)
        .delete(utils.methodNotAllowed);

    apiRoutes.use('/diagnosisResults', diagnosisResultRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getDiagnosisResults (req, res) {
        utils.checkRole(req, res, ['pharmacist']);
        if(req.query.patient){
            Appointment.find({
                patient: req.query.patient
            })
            .then(
                function(appointments){
                    return DiagnosisResult.find({
                        appointment: {
                            $in: appointments
                        }
                    })
                    .populate('appointment')
                    .populate('diseases')
                    .populate('medicines');
                }
            )
            .then(
                function (diagnosisResults) {
                    res.json({
                        success: true,
                        data: diagnosisResults
                    });
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get diagnosisResult data.'
                    });
                }
            );
        }
        else{
            Workday.find({
                date: moment().startOf('day').toDate()
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
                    return DiagnosisResult.find({
                        appointment: {
                            $in: appointments
                        }
                    })
                    .populate('appointment')
                    .populate('diseases')
                    .populate('medicines');
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
                function (diagnosisResults) {
                    let arr = [];
                    diagnosisResults.forEach(
                        function(diagnosisResult){
                            diagnosisResult = diagnosisResult.toObject();
                            let p = new Promise(
                                function(resolve, reject){
                                    Patient.findById(diagnosisResult.appointment.patient)
                                    .then(
                                        function(patient){
                                            diagnosisResult.appointment.patient = patient;
                                            return Doctor.findById(diagnosisResult.appointment.doctor)
                                            .populate('clinic');
                                        },
                                        function(error){
                                            reject();
                                        }
                                    ).then(
                                        function(doctor){
                                            diagnosisResult.appointment.doctor = doctor;
                                            return Workday.findById(diagnosisResult.appointment.workday);
                                        },
                                        function(error){
                                            reject();
                                        }
                                    ).then(
                                        function(workday){
                                            diagnosisResult.appointment.workday = workday;
                                            resolve(diagnosisResult);
                                        },
                                        function(error){
                                            reject();
                                        }
                                    );
                                }
                            );
                            arr.push(p);
                        }
                    );
                    return Promise.all(arr);
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get diagnosisResult data.'
                    });
                }
            )
            .then(
                function(diagnosisResults){
                    res.json({
                        success: true,
                        data: diagnosisResults
                    });
                },
                function(error){
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get diagnosisResult data.'
                    });
                }
            );
        }
    }
    
    function getDiagnosisResultByAppointment (req, res) {
        utils.checkRole(req, res, ['pharmacist','nurse','doctor']);
        DiagnosisResult.findOne({
            appointment: req.params.appointment
        })
        .populate('appointment')
        .populate('diseases')
        .populate('medicines')
        .then(
            function (diagnosisResult) {
                if (!diagnosisResult) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No diagnosisResult with this appointmentId.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: diagnosisResult
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get diagnosisResult data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createDiagnosisResult (req, res) {
        utils.checkRole(req, res, ['doctor']);
        if (!req.body.appointment) {
            utils.responseMissingField(res, 'appointment');
        }
        validateField(res, req.body);
        let diseasesRef;
        DiagnosisResult.findOne({
            appointment: req.body.appointment
        })
        .then(
            function (diagnosisResult) {
                if (diagnosisResult) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This diagnosisResult has already in the system'
                    });
                    Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get diagnosisResult data.'
                });
            }
        )
        .then(
            function () {
                return Disease.find({
                    name: {
                        $in: req.body.diseases
                    }
                });
            }
        )
        .then(
            function (diseases) {
                diseasesRef = diseases;
                if(diseases.length !== req.body.diseases.length){
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No some name of diseases in database.'
                    });
                    Promise.reject(400);
                }
                else{
                    return Medicine.find({
                        name: {
                            $in: req.body.medicines
                        }
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get disease data.'
                });
            }
        )
        .then(
            function (medicines) {
                if(medicines.length !== req.body.medicines.length){
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No some name of medicines in database.'
                    });
                    Promise.reject(400);
                }
                else{
                    let nom = [];
                    medicines.forEach(function(medicine){
                        req.body.medicines.forEach(function(med,idx){
                            if(medicine.name === med){
                                nom.push(req.body.numberOfMedicines[idx]);
                            }
                        });
                    });
                    return {
                        appointment: req.body.appointment,
                        description: req.body.description,
                        diseases: diseasesRef,
                        medicines: medicines,
                        numberOfMedicines: nom,
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get medicine data.'
                });
            }
        )
        .then(
            function (diagnosisResultData) {
                var diagnosisResult = new DiagnosisResult(diagnosisResultData);
                return diagnosisResult.save();
            }
        )
        .then(
            function (diagnosisResult) {
                res.json({
                    success: true,
                    clientMessage: 'Create diagnosisResult succeed',
                    data: diagnosisResult
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create diagnosisResult failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateDiagnosisResultByAppointment (req, res) {
        utils.checkRole(req, res, ['doctor']);
        validateField(res, req.body);
        let diagnosisResultRef, diseasesRef;
        DiagnosisResult.findOne({
            appointment: req.params.appointment
        })
        .then(
            function (diagnosisResult) {
                if (diagnosisResult) {
                    diagnosisResultRef = diagnosisResult;
                    return Disease.find({
                        name: {
                            $in: req.body.diseases
                        }
                    });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No diagnosisResult with this appointment.'
                    });
                    Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get diagnosisResult data.'
                });
            }
        )
        .then(
            function (diseases) {
                diseasesRef = diseases;
                if(diseases.length !== req.body.diseases.length){
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No some name of diseases in database.'
                    });
                    Promise.reject(400);
                }
                else{
                    return Medicine.find({
                        name: {
                            $in: req.body.medicines
                        }
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get disease data.'
                });
            }
        )
        .then(
            function (medicines) {
                if(medicines.length !== req.body.medicines.length){
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No some name of medicines in database.'
                    });
                    Promise.reject(400);
                }
                else{
                    let nom = [];
                    medicines.forEach(function(medicine){
                        req.body.medicines.forEach(function(med,idx){
                            if(medicine.name === med){
                                nom.push(req.body.numberOfMedicines[idx]);
                            }
                        });
                    });
                    return {
                        description: req.body.description,
                        diseases: diseasesRef,
                        medicines: medicines,
                        numberOfMedicines: nom,
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get medicine data.'
                });
            }
        )
        .then(
            function(data) {
                diagnosisResultRef.description = data.description;
                diagnosisResultRef.diseases = data.diseases;
                diagnosisResultRef.medicines = data.medicines;
                diagnosisResultRef.numberOfMedicines = data.numberOfMedicines;
                return diagnosisResultRef.save();
            }
        )
        .then(
            function (diagnosisResult) {
                res.json({
                    success: true,
                    clientMessage: 'Update diagnosisResult succeed',
                    data: diagnosisResult
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update diagnosisResult failed',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.description) {
            utils.responseMissingField(res, 'description');
        }

        if (!body.diseases) {
            utils.responseMissingField(res, 'diseases');
        }
    }
}