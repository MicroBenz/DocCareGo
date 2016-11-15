module.exports = function (apiRoutes, express) {
    var staffRoutes = express.Router();    
    var Staff = require('../model/Staff.js');
    var utils = require('../utils.js');

    staffRoutes.route('/')
        .get(getStaffs)
        .post(createStaff)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    staffRoutes.route('/:HN')
        .get(getStaffByHN)
        .post(utils.methodNotAllowed)
        .put(updateStaffByHN)
        .delete(deleteStaffByHN);

    apiRoutes.use('/staffs', staffRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getStaffs (req, res) {
        utils.checkRole(req, res, ['admin']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.search) {
            Staff.find({
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
                        clientMessage: 'Cannot get staff data.'
                    });
                }
            );
        }
        else {
            Staff.find().select(filterField).limit(10).then(
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
                        clientMessage: 'Cannot get staff data.'
                    });
                }
            );
        }
    }

    function getStaffByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Staff.findOne({
            HN: req.params.HN
        })
        .then(
            function (staff) {
                if (!staff) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No staff with this HN.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: staff
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get staff data.'
                });
            }
        );
    }

    //----------------- POST (CREATE) -----------------
    function createStaff (req, res) {
        utils.checkRole(req, res, ['admin']);
        if (!req.body.HN) {
            utils.responseMissingField(res, 'HN');
        }

        validateField(res, req.body);
        Staff.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (staff) {
                if (staff) {
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
                    clientMessage: 'Cannot get staff data.'
                });
            }
        )
        .then(
            function (staffData) {
                var staff = new Staff(staffData);
                return staff.save();
            }
        )
        .then(
            function (staff) {
                res.json({
                    success: true,
                    clientMessage: 'Create staff succeed',
                    data: staff
                });
            },
            function (error) {
                console.error(error);
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create staff failed',
                    message: error
                });
            }
        );
    }

    //----------------- PUT (UPDATE) -----------------
    function updateStaffByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        validateField(res, req.body);
        Staff.findOne({
            HN: req.params.HN
        })
        .then(
            function (staff) {
                if (staff) {
                    staff.HN = req.body.HN;
                    staff.personalID = req.body.personalID;
                    staff.preName = req.body.preName;
                    staff.name = req.body.name;
                    staff.surname = req.body.surname;
                    return staff.save();
                }
                else{
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No staff with this HN.'
                    });
                    Promise.reject(400);
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get staff data.'
                });
            }
        )
        .then(
            function (staff) {
                res.json({
                    success: true,
                    clientMessage: 'Update staff succeed',
                    data: staff
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Update staff failed',
                    message: error
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteStaffByHN (req, res) {
        utils.checkRole(req, res, ['admin']);
        Staff.findOne({
            HN: req.params.HN
        })
        .then(
            function (staff) {
                if (!staff) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No staff with this HN.'
                    });
                }
                else {
                    staff.delete(req.decoded._id, 
                        function () {
                            res.json({
                                success: true,
                                clientMessage: 'Delete staff succeed.',
                                message: 'Delete staff succeed.'
                            });
                        },
                        function (error) {
                            res.status(500).send({
                                success: false,
                                clientMessage: 'Delete staff failed.',
                                message: error
                            });
                        }
                    );
                }
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    status: 'Delete staff failed.',
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