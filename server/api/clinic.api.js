module.exports = function (apiRoutes, express) {
    var clinicRoutes = express.Router();    
    var Clinic = require('../model/Clinic.js');
    var utils = require('../utils.js');

    clinicRoutes.route('/')
        .get(getClinics)
        .post(createClinic)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    clinicRoutes.route('/:name')
        .get(getClinicByName)
        .post(utils.methodNotAllowed)
        .put(updateClinicByName)
        .delete(deleteClinicByName);

    apiRoutes.use('/clinics', clinicRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getClinics (req, res) {
        utils.checkRole(req, res, ['admin']);
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

    function getClinicByName (req, res) {
        utils.checkRole(req, res, ['doctor','admin']);
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
    function createClinic (req, res) {
        utils.checkRole(req, res, ['admin']);
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
                    Promise.reject(400);
                }
                else {
                    return {
                        name: req.body.name,
                        description: req.body.description
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
            function (data) {
                var clinic = new Clinic(data);
                return clinic.save();
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
    function updateClinicByName (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Clinic.findOne({
            name: req.params.name
        })
        .then(
            function (clinic) {
                clinic.name = req.body.name;
                clinic.description = req.body.description;
                return clinic.save();
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot update clinic data.'
                });
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
    function deleteClinicByName (req, res) {
        utils.checkRole(req, res, ['admin']);
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

    }
};