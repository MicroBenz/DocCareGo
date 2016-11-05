module.exports = function (apiRoutes, express) {
    var clinicRoutes = express.Router();    
    var Clinic = require('../model/Clinic.js');
    var utils = require('../utils.js');

    // clinicRoutes.use(function (req, res, next) {
    //     if (req.decoded.role !== 'admin') {
    //         res.status(400).send({
    //             status: 'Bad Request',
    //             message: 'This API is not allowed for your role.'
    //         });
    //     }
    //     next();
    // });

    clinicRoutes.route('/')
        .get(getClinics)
        .post(createclinic)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    clinicRoutes.route('/:id')
        .get(getClinicById)
        .post(utils.methodNotAllowed)
        .put(updateClinicById)
        .delete(deleteClinicById);

    apiRoutes.use('/clinics', clinicRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getClinics (req, res) {
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Clinic.find({
                $or: [
                    {
                        name: {
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
                        clientMessage: 'Cannot get Clinic data.'
                    });
                }
            );
        }
        else {
            Clinic.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get clinic data.'
                    });
                }
            );
        }
    }

    function getClinicById (req, res) {
        Clinic.findOne({
            name: req.params.name
        })
        .then(
            function (clinic) {
                if (!clinic) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No clinic with this name.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: clinic
                    });
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
        );
    }

    //----------------- POST (CREATE) -----------------
    function createclinic (req, res) {
        if (!req.body.name) {
            utils.responseMissingField(res, 'name');
        }

        validateField(res, req.body);
        Clinic.findOneWithDeleted({
            $or: [
                { name: req.body.name }
            ]
        })
        .then(
            function (clinic) {
                if (clinic) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This name has already in the system'
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
            function (clinic) {
                res.json({
                    success: true,
                    clientMessage: 'Create clinic succeed',
                    data: clinic
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create clinic failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateClinicById (req, res) {
        validateField(res, req.body);
        var clinicRef;
        Clinic.findOne({
            name: req.params.name
        })
        .then(
            function (data) {
                clinicRef.name = data.name;
                clinicRef.description = data.description;
                return clinicRef.save();
            }
        )
        .then(
            function (clinic) {
                res.json({
                    success: true,
                    clientMessage: 'Update clinic succeed',
                    data: clinic
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update clinic failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteClinicById (req, res) {
        Clinic.findOne({
            name: req.params.name
        })
        .then(
            function (clinic) {
                if (!clinic) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No clinic with this Name.'
                    });
                }
                else {
                    clinic.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete clinic succeed.',
                                message: 'Delete clinic succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete clinic failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete clinic failed.',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.name) {
            utils.responseMissingField(res, 'name');
        }

        if (!body.description) {
            utils.responseMissingField(res, 'description');
        }
    }
};