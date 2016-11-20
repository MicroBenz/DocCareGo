module.exports = function (apiRoutes, express) {
    var diseaseRoutes = express.Router();    
    var Disease = require('../model/Disease.js');
    var utils = require('../utils.js');

    diseaseRoutes.route('/')
        .get(getDiseases)
        .post(createDisease)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    diseaseRoutes.route('/:name')
        .get(getDiseaseByName)
        .post(utils.methodNotAllowed)
        .put(updateDiseaseByName)
        .delete(deleteDiseaseByName);

    apiRoutes.use('/diseases', diseaseRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getDiseases (req, res) {
        utils.checkRole(req, res, ['admin', 'doctor']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Disease.find({
                $or: [
                    {
                        name: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        icd10: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        snowmed: {
                            $regex: req.query.search,
                            $options: 'i'
                        }
                    },
                    {
                        drg: {
                            $regex: req.query.search,
                            $options: 'i'
                        },
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
                        clientMessage: 'Cannot get disease data.'
                    });
                }
            );
        }
        else {
            Disease.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get disease data.'
                    });
                }
            );
        }
    }

    function getDiseaseByName (req, res) {
        utils.checkRole(req, res, ['admin','doctor']);
        Disease.findOne({
            name: req.params.name
        })
        .then(
            function (disease) {
                if (!disease) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No disease with this name.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: disease
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
        );
    }

    //----------------- POST (CREATE) -----------------
    function createDisease (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.name) {
            utils.responseMissingField(res, 'name');
        }

        valNameateField(res, req.body);
        Disease.findOneWithDeleted({
            $or: [
                { name: req.body.name }
            ]
        })
        .then(
            function (disease) {
                if (disease) {
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
                        icd10: req.body.icd10,
                        snowmed: req.body.snowmed,
                        drg: req.body.drg,
                        description: req.body.description
                    };
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
            function (data) {
                var disease = new Disease(data);
                return disease.save();
            }
        )
        .then(
            function (disease) {
                res.json({
                    success: true,
                    clientMessage: 'Create disease succeed',
                    data: disease
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create disease failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateDiseaseByName (req, res) {
        utils.checkRole(req, res, ['admin']);
        valNameateField(res, req.body);
        Disease.findOne({
            name: req.params.name
        })
        .then(
            function (disease) {
                disease.name = req.body.name;
                disease.icd10 = req.body.icd10;
                disease.snowmed = req.body.snowmed;
                disease.drg = req.body.drg;
                disease.description = req.body.description;
                return disease.save();
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
            function (disease) {
                res.json({
                    success: true,
                    clientMessage: 'Update disease succeed',
                    data: disease
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update disease failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteDiseaseByName (req, res) {
        utils.checkRole(req, res, ['admin']);
        Disease.findOne({
            name: req.params.name
        })
        .then(
            function (disease) {
                if (!disease) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No disease with this name.'
                    });
                }
                else {
                    disease.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete disease succeed.',
                                message: 'Delete disease succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete disease failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete disease failed.',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function valNameateField (res, body) {
        
    }
};