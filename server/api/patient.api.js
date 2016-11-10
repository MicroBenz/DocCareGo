module.exports = function (apiRoutes, express) {
    var patientRoutes = express.Router();    
    var Patient = require('../model/Patient.js');
    var utils = require('../utils.js');

    patientRoutes.route('/')
        .get(getPatients)
        .post(createPatient)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    patientRoutes.route('/:HN')
        .get(getPatientByHN)
        .post(utils.methodNotAllowed)
        .put(updatePatientByHN)
        .delete(deletePatientByHN);

    apiRoutes.use('/patients', patientRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getPatients (req, res) {
        utils.checkRole(req, res, ['admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Patient.find({
                $or: [
                    {
                        HN: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        personalID: {
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
                        clientMessage: 'Cannot get patient data.'
                    });
                }
            );
        }
        else {
            Patient.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get patient data.'
                    });
                }
            );
        }
    }

    function getPatientByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Patient.findOne({
            HN: req.params.HN
        })
        .then(
            function (patient) {
                if (!patient) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No patient with this HN.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: patient
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patient data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createPatient (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.HN) {
            utils.responseMissingField(res, 'HN');
        }

        validateField(res, req.body);
        Patient.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (patient) {
                if (patient) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This HN or personalID has already in the system'
                    });
                    Promise.reject(400);
                }
                else {
                    return {
                        HN: req.body.HN,
                        personalID: req.body.personalID,
                        preName: req.body.preName,
                        name: req.body.name,
                        surname: req.body.surname,
                        houseNumber: req.body.houseNumber,
                        road: req.body.road,
                        soi: req.body.soi,
                        subdistrict: req.body.subdistrict,
                        district: req.body.district,
                        province: req.body.province,
                        zipCode: req.body.zipCode,
                        country: req.body.country,
                        tel: req.body.tel
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patient data.'
                });
            }
        )
        .then(
            function (patientData) {
                var patient = new patient(patientData);
                return patient.save();
            }
        )
        .then(
            function (patient) {
                res.json({
                    success: true,
                    clientMessage: 'Create patient succeed',
                    data: patient
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create patient failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updatePatientByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Patient.findOne({
            HN: req.params.HN
        })
        .then(
            function (patient) {
                if (patient) {
                    patient.HN = req.body.HN;
                    patient.personalID = req.body.personalID;
                    patient.preName = req.body.preName;
                    patient.name = req.body.name;
                    patient.surname = req.body.surname;
                    patient.houseNumber = req.body.houseNumber;
                    patient.road = req.body.road;
                    patient.soi = req.body.soi;
                    patient.subdistrict = req.body.subdistrict;
                    patient.district = req.body.district;
                    patient.province = req.body.province;
                    patient.zipCode = req.body.zipCode;
                    patient.country = req.body.country;
                    patient.tel = req.body.tel;
                    return patient.save();
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No patient with this HN.'
                    });
                    Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patient data.'
                });
            }
        )
        .then(
            function (patient) {
                res.json({
                    success: true,
                    clientMessage: 'Update patient succeed',
                    data: patient
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update patient failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deletePatientByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Patient.findOne({
            HN: req.params.HN
        })
        .then(
            function (patient) {
                if (!patient) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No patient with this HN.'
                    });
                }
                else {
                    patient.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete patient succeed.',
                                message: 'Delete patient succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete patient failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete patient failed.',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.HN) {
            utils.responseMissingField(res, 'HN');
        }

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

        if (!body.district) {
            utils.responseMissingField(res, 'district');
        }

        if (!body.province) {
            utils.responseMissingField(res, 'province');
        }

        if (!body.zipCode) {
            utils.responseMissingField(res, 'zipCode');
        }

        if (!body.country) {
            utils.responseMissingField(res, 'country');
        }
    }
};