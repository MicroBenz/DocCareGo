module.exports = function (apiRoutes, express) {
    var pharmacistRoutes = express.Router();    
    var Pharmacist = require('../model/Pharmacist.js');
    var utils = require('../utils.js');

    pharmacistRoutes.route('/')
        .get(getPharmacists)
        .post(createPharmacist)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    pharmacistRoutes.route('/:HN')
        .get(getPharmacistByHN)
        .post(utils.methodNotAllowed)
        .put(updatePharmacistByHN)
        .delete(deletePharmacistByHN);

    apiRoutes.use('/pharmacists', pharmacistRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getPharmacists (req, res) {
        utils.checkRole(req, res, ['admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Pharmacist.find({
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
                        clientMessage: 'Cannot get pharmacist data.'
                    });
                }
            );
        }
        else {
            Pharmacist.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get pharmacist data.'
                    });
                }
            );
        }
    }

    function getPharmacistByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Pharmacist.findOne({
            HN: req.params.HN
        })
        .then(
            function (pharmacist) {
                if (!pharmacist) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No pharmacist with this HN.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: pharmacist
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get pharmacist data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createPharmacist (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.HN) {
            utils.responseMissingField(res, 'HN');
        }

        validateField(res, req.body);
        Pharmacist.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (pharmacist) {
                if (pharmacist) {
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
                        surname: req.body.surname
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get pharmacist data.'
                });
            }
        )
        .then(
            function (pharmacistData) {
                var pharmacist = new Pharmacist(pharmacistData);
                return pharmacist.save();
            }
        )
        .then(
            function (pharmacist) {
                res.json({
                    success: true,
                    clientMessage: 'Create pharmacist succeed',
                    data: pharmacist
                });
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create pharmacist failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updatePharmacistByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Pharmacist.findOne({
            HN: req.params.HN
        })
        .then(
            function (pharmacist) {
                if (pharmacist) {
                    pharmacist.HN = req.body.HN;
                    pharmacist.personalID = req.body.personalID;
                    pharmacist.preName = req.body.preName;
                    pharmacist.name = req.body.name;
                    pharmacist.surname = req.body.surname;
                    return pharmacist.save();
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No pharmacist with this HN.'
                    });
                    Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get pharmacist data.'
                });
            }
        )
        .then(
            function (pharmacist) {
                res.json({
                    success: true,
                    clientMessage: 'Update pharmacist succeed',
                    data: pharmacist
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update pharmacist failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deletePharmacistByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Pharmacist.findOne({
            HN: req.params.HN
        })
        .then(
            function (pharmacist) {
                if (!pharmacist) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No pharmacist with this HN.'
                    });
                }
                else {
                    pharmacist.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete pharmacist succeed.',
                                message: 'Delete pharmacist succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete pharmacist failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete pharmacist failed.',
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
    }
};