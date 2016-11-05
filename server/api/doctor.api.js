module.exports = function (apiRoutes, express) {
    var doctorRoutes = express.Router();    
    var Doctor = require('../model/Doctor.js');
    var Address = require('../model/Clinic.js');
    var utils = require('../utils.js');

    doctorRoutes.route('/')
        .get(getDoctors)
        .post(createDoctor)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    doctorRoutes.route('/:HN')
        .get(getDoctorByHN)
        .post(utils.methodNotAllowed)
        .put(updateDoctorByHN)
        .delete(deleteDoctorByHN);

    apiRoutes.use('/doctors', doctorRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getDoctors (req, res) {
        utils.checkRole(req, res, ['staff','admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Doctor.find({
                $or: [
                    {
                        HN: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        name: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        surname: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    }
                ]
            })
            .populate('clinic')
            .select(filterField)
            .then(
                function (results) {
                    res.json({
                        success: true,
                        data: results
                    });
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get doctor data.'
                    });
                }
            );
        }
        else {
            Doctor.find().populate('clinic').select(filterField).limit(10).then(
                function (results) {
                    res.json({
                        success: true,
                        limit: 10,
                        data: results
                    });
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get doctor data.'
                    });
                }
            );
        }
    }

    function getDoctorByHN (req, res) {
        utils.checkRole(req, res, ['staff','admin']);
        Doctor.findOne({
            HN: req.params.HN
        })
        .populate('clinic')
        .then(
            function (doctor) {
                if (!doctor) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No doctor with this HN.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: doctor
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get doctor data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createDoctor (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.HN) {
            utils.responseMissingField(res, 'HN');
        }

        validateField(res, req.body);
        Doctor.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (doctor) {
                if (doctor) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This HN or personalID has already in the system'
                    });
                    mongoose.Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get doctor data.'
                });
            }
        )
        .then(
            function () {
                return Clinic.findOne({
                    name: req.body.clinic
                });
            }
        )
        .then(
            function (clinic) {
                if (!clinic) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No clinic with this name.'
                    });
                    mongoose.Promise.reject(400);
                }
                else {
                    return {
                        HN: req.body.HN,
                        personalID: req.body.personalID,
                        preName: req.body.preName,
                        name: req.body.name,
                        surname: req.body.surname,
                        clinic: clinic
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get clinic data.'
                });
            }
        )
        .then(
            function (doctorData) {
                var doctor = new Doctor(doctorData);
                return doctor.save();
            }
        )
        .then(
            function (doctor) {
                res.json({
                    success: true,
                    clientMessage: 'Create Doctor succeed',
                    data: doctor
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create Doctor failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateDoctorByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        var doctorRef;
        Doctor.findOne({
            HN: req.params.HN
        })
        .then(
            function (doctor) {
                if (doctor) {
                    doctorRef = doctor;
                    return Clinic.findOne({
                        name: req.body.clinic
                    });
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No doctor with this HN.'
                    });
                    mongoose.Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get doctor data.'
                });
            }
        )
        .then(
            function (clinic) {
                if (clinic) {
                    return {
                        personalID: req.body.personalID,
                        preName: req.body.preName,
                        name: req.body.name,
                        surname: req.body.surname,
                        clinic: clinic
                    };
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No clinic with this name.'
                    });
                    mongoose.Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get clinic data.'
                });
            }
        )
        .then(
            function (data) {
                doctorRef.personalID = data.personalID;
                doctorRef.preName = data.preName;
                doctorRef.name = data.name;
                doctorRef.surname = data.surname;
                doctorRef.clinic = data.clinic;
                return doctorRef.save();
            }
        )
        .then(
            function (doctor) {
                res.json({
                    success: true,
                    clientMessage: 'Update Doctor succeed',
                    data: doctor
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update Doctor failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteDoctorByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Doctor.findOne({
            HN: req.params.HN
        })
        .then(
            function (doctor) {
                if (!doctor) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No doctor with this HN.'
                    });
                }
                else {
                    doctor.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete Doctor succeed.',
                                message: 'Delete Doctor succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete Doctor failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete Doctor failed.',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.personalID) {
            utils.responseMissingField(res, 'personalID');
        }

        if (!body.preName) {
            utils.responseMissingField(res, 'preName');
        }
            
        if (!body.name) {
            utils.responseMissingField(res, 'name');
        }
            
        if (!body.surname) {
            utils.responseMissingField(res, 'surname');
        }

        if (!body.clinic) {
            utils.responseMissingField(res, 'clinic');
        }
    }
};