module.exports = function (apiRoutes, express) {
    var medicineRoutes = express.Router();    
    var Medicine = require('../model/Medicine.js');
    var utils = require('../utils.js');

    medicineRoutes.route('/')
        .get(getMedicines)
        .post(createMedicine)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    medicineRoutes.route('/:name')
        .get(getMedicineByName)
        .post(utils.methodNotAllowed)
        .put(updateMedicineByName)
        .delete(deleteMedicineByName);

    apiRoutes.use('/medicines', medicineRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getMedicines (req, res) {
        utils.checkRole(req, res, ['admin']);
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

    function getMedicineByName (req, res) {
        utils.checkRole(req, res, ['doctor','pharmacist','admin']);
        Medicine.findOne({
            name: req.params.name
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
        utils.checkRole(req, res, ['admin']);
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
                    clientMessage: 'Cannot get medicine data.'
                });
            }
        )
        .then(
            function (data) {
                var medicine = new Medicine(data);
                return medicine.save();
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
    function updateMedicineByName (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Medicine.findOne({
            name: req.params.name
        })
        .then(
            function (medicine) {
                medicine.name = req.body.name;
                medicine.description = req.body.description;
                return medicine.save();
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot update medicine data.'
                });
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
    function deleteMedicineByName (req, res) {
        utils.checkRole(req, res, ['admin']);
        Medicine.findOne({
            name: req.params.name
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
    }
};