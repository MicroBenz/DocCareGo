module.exports = function (apiRoutes, express) {
    var nurseRoutes = express.Router();    
    var Nurse = require('../model/Nurse.js');
    var utils = require('../utils.js');

    nurseRoutes.route('/')
        .get(getNurses)
        .post(createNurse)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    nurseRoutes.route('/:HN')
        .get(getNurseByHN)
        .post(utils.methodNotAllowed)
        .put(updateNurseByHN)
        .delete(deleteNurseByHN);

    apiRoutes.use('/nurses', nurseRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getNurses (req, res) {
        utils.checkRole(req, res, ['admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Nurse.find({
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
                        clientMessage: 'Cannot get nurse data.'
                    });
                }
            );
        }
        else {
            Nurse.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get nurse data.'
                    });
                }
            );
        }
    }

    function getNurseByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Nurse.findOne({
            HN: req.params.HN
        })
        .then(
            function (nurse) {
                if (!nurse) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No nurse with this HN.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: nurse
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get nurse data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createnurse (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.HN) {
            utils.responseMissingField(res, 'HN');
        }

        validateField(res, req.body);
        Nurse.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (nurse) {
                if (nurse) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'This HN or personalID has already in the system'
                    });
                    mongoose.Promise.reject(400);
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
                    clientMessage: 'Cannot get nurse data.'
                });
            }
        )
        .then(
            function (nurseData) {
                var nurse = new nurse(nurseData);
                return nurse.save();
            }
        )
        .then(
            function (nurse) {
                res.json({
                    success: true,
                    clientMessage: 'Create nurse succeed',
                    data: nurse
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create nurse failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateNurseByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Nurse.findOne({
            HN: req.params.HN
        })
        .then(
            function (nurse) {
                if (nurse) {
                    nurse.HN = req.body.HN;
                    nurse.personalID = req.body.personalID;
                    nurse.preName = req.body.preName;
                    nurse.name = req.body.name;
                    nurse.surname = req.body.surname;
                    return nurse.save();
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No nurse with this HN.'
                    });
                    mongoose.Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot update nurse data.'
                });
            }
        )
        .then(
            function (nurse) {
                res.json({
                    success: true,
                    clientMessage: 'Update nurse succeed',
                    data: nurse
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update nurse failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deletenurseByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        nurse.findOne({
            HN: req.params.HN
        })
        .then(
            function (nurse) {
                if (!nurse) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No nurse with this HN.'
                    });
                }
                else {
                    nurse.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete nurse succeed.',
                                message: 'Delete nurse succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete nurse failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete nurse failed.',
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