module.exports = (apiRoutes, express) => {
    var AppointmentRoutes = express.Router();    
    var Appointment = require('../model/Appointment');
    var Patient = require('../model/Patient');
    var Doctor = require('../model/Doctor');
    var User = require('../model/User');
    var Workday = require('../model/Workday');
    var utils = require('../utils');
    var moment = require('moment');

    AppointmentRoutes.route('/')
        .get(getAppointments)
        .post(createAppointment)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    AppointmentRoutes.route('/:id')
        .get(getAppointmentById)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(deleteAppointmentById);

    apiRoutes.use('/appointments', AppointmentRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getAppointments (req, res) {
        utils.checkRole(req, res, ['staff','admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        let userRef, workdaysRef;
        if(req.query.search){    
            User.findOne({
                username: req.query.search
            })
            .then(
                function(user){
                    if(user){
                        userRef = user;
                        return Workday.find({
                            date: {
                                $gte: moment().toDate()
                            }
                        });
                    }
                    else{
                        res.status(400).send({
                            success: false,
                            message: 'Bad Request',
                            clientMessage: 'No user with this HN.'
                        });
                        Promise.reject(400);
                    }
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get user data.'
                    });
                }
            )
            .then(
                function(workdays){
                    workdaysRef = workdays;
                    if(userRef.role === 'patient'){
                        return Patient.findOne({
                            HN: userRef.username
                        });
                    }
                    else if(userRef.role === 'doctor'){
                        return Doctor.findOne({
                            HN: userRef.username
                        });
                    }
                    else{
                        res.status(400).send({
                            success: false,
                            message: 'Bad Request',
                            clientMessage: 'No patient or doctor with this HN.'
                        });
                        Promise.reject(400);
                    }
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
                function(user){
                    if(userRef.role === 'patient'){
                        return Appointment.find({
                            patient: user,
                            workday: {
                                $in: workdaysRef
                            }
                        })
                        .populate('patient')
                        .populate('doctor')
                        .populate('workday')
                        .select(filterField);
                    }
                    else if(userRef.role === 'doctor'){
                        return Appointment.find({
                            doctor: user,
                            workday: {
                                $in: workdaysRef
                            }
                        })
                        .populate('patient')
                        .populate('doctor')
                        .populate('workday')
                        .select(filterField);
                    }
                    else{
                        res.status(400).send({
                            success: false,
                            message: 'Bad Request',
                            clientMessage: 'No patient or doctor with this HN.'
                        });
                        Promise.reject(400);
                    }
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get patient or doctor data.'
                    });
                }
            )
            .then(
                function(appointments){
                    res.json({
                        success: true,
                        data: appointments
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
            );
        }
        else{
            res.status(400).send({
                success: false,
                message: 'Bad Request',
                clientMessage: 'No patient or doctor with this HN.'
            });
        }
    }

    function getAppointmentById (req, res) {
        utils.checkRole(req, res, ['patient','staff']);
        Appointment.findById(req.params.id)
        .populate('patient')
        .populate('doctor')
        .populate('workday')
        .then(
            function (appointment) {
                if (!appointment) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No appointment with this id.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: appointment
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get appointment data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createAppointment (req, res) {
        utils.checkRole(req, res, ['patient','staff']);
        validateField(res, req.body);
        Patient.findOne({
            HN: req.body.patient
        })
        .then(
            function(patient){
                if(patient){
                    patientRef = patient;
                    return Doctor.findOne({
                        HN: req.body.doctor
                    });
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No patient with this HN.'
                    });
                }
            }
        )
        .then(
            function(doctor){
                if(doctor){
                    let data = {
                        description: req.body.description,
                        patient: patientRef,
                        doctor: doctor,
                        workday: req.body.workday
                    };
                    let app = new Appointment(data);
                    return app.save();
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No doctor with this HN.'
                    });
                }
            }
        )
        .then(
            function(appointment){
                //send SMS and Email to patient
                res.json({
                    success: true,
                    clientMessage: 'Create appointment succeed.',
                    data: appointment
                });
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Create appointment failed.'
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteAppointmentById (req, res) {
        utils.checkRole(req, res, ['staff']);
        Appointment.findById(req.params.id)
        .then(
            function (appointment) {
                if (!appointment) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No appointment with this id.'
                    });
                }
                else {
                    appointment.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete appointment succeed.'
                            });
                        },
                        function (error) {
                            console.log(error);
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete appointment failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete appointment failed.',
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

        if (!body.patient) {
            utils.responseMissingField(res, 'patient');
        }
            
        if (!body.doctor) {
            utils.responseMissingField(res, 'doctor');
        }
            
        if (!body.workday) {
            utils.responseMissingField(res, 'workday');
        }
    }
};