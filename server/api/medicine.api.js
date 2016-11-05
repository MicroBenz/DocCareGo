module.exports = function (apiRoutes, express) {
    var medicineRoutes = express.Router();    
    var Medicine = require('../model/Medicine.js');
    var utils = require('../utils.js');

    medicineRoutes.use(function (req, res, next) {
        if (req.decoded.role !== 'admin') {
            res.status(400).send({
                status: 'Bad Request',
                message: 'This API is not allowed for your role.'
            });
        }
        next();
    });

    medicineRoutes.route('/')
        .get(getmedicines)
        .post(createmedicine)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    medicineRoutes.route('/:id')
        .get(getmedicineById)
        .post(utils.methodNotAllowed)
        .put(updatemedicineById)
        .delete(deletemedicineById);

    apiRoutes.use('/medicines', medicineRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getMedicines (req, res) {
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Medicine.find({
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
                        clientMessage: 'Cannot get medicine data.'
                    });
                }
            );
        }
        else {
            Medicine.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get medicine data.'
                    });
                }
            );
        }
    }

    function getMedicineById (req, res) {
        Medicine.findOne({
            Name: req.params.Name
        })
        .then(
            function (medicine) {
                if (!medicine) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No medicine with this name.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: medicine
                    });
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
        );
    }

    //----------------- POST (CREATE) -----------------
    function createMedicine (req, res) {
        if (!req.body.name) {
            utils.responseMissingField(res, 'name');
        }

        validateField(res, req.body);
        Medicine.findOneWithDeleted({
            $or: [
                { Name: req.body.name }
            ]
        })
        .then(
            function (medicine) {
                if (medicine) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This ID has already in the system'
                    });
                    mongoose.Promise.reject(400);
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
            function (medicine) {
                res.json({
                    success: true,
                    clientMessage: 'Create medicine succeed',
                    data: medicine
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create medicine failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateMedicineById (req, res) {
        validateField(res, req.body);
        var medicineRef;
        Medicine.findOne({
            Name: req.params.name
        })
        .then(
            function (data) {
                medicineRef.name = data.name;
                medicineRef.description = data.description;
                return medicineRef.save();
            }
        )
        .then(
            function (medicine) {
                res.json({
                    success: true,
                    clientMessage: 'Update medicine succeed',
                    data: medicine
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update medicine failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteMedicineById (req, res) {
        Medicine.findOne({
            Name: req.params.name
        })
        .then(
            function (medicine) {
                if (!medicine) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No medicine with this Name.'
                    });
                }
                else {
                    medicine.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete medicine succeed.',
                                message: 'Delete medicine succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete medicine failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete medicine failed.',
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