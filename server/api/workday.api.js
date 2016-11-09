module.exports = (apiRoutes, express) => {
    var workdayRoutes = express.Router();    
    var Workday = require('../model/Workday');
    var Appointment = require('../model/Appointment');
    var utils = require('../utils');
    var moment = require('moment');

    workdayRoutes.route('/')
        .get(utils.methodNotAllowed)
        .post(createWorkday)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
        // .delete(deleteWorkdays);
    
    workdayRoutes.route('/:doctor')
        .get(getWorkdayByDoctor)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(deleteWorkdayByDoctor);

    apiRoutes.use('/workdays', workdayRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getWorkdayByDoctor (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        Workday.find({
            doctor: req.params.doctor
        })
        .populate('doctor')
        .then(
           function (workday) {
                if (!workday) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No workday with this id.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: workday
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get workday data.'
                });
            }
        );
    }

    //----------------- POST -----------------
    function createWorkday (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        if (!req.body.doctor) {
            utils.responseMissingField(res, 'doctor');
        }
        if (!req.body.workdays) {
            utils.responseMissingField(res, 'workdays');
        }
        let arrp = [];
        req.body.workdays.forEach(
            function(wd){
                let pp = new Promise(
                    function(sol,ject){
                        let d = moment().day(wd.day).startOf('day');
                        let arr = [];
                        for(let i=0; i<100; i++, d.add(7,'day')){
                            let data = {
                                doctor: req.body.doctor,
                                date: d.toDate(),
                                time: wd.time
                            };
                            let p = new Promise(
                                function(resolve, reject){
                                    Workday.findOne(data)
                                    .then(
                                        function(workday){
                                            if(!workday){
                                                let w = new Workday(data);
                                                return w.save();
                                            }
                                            else{
                                                resolve(workday);
                                            }
                                        },function(error){
                                            console.log(error);
                                            res.status(500).send({
                                                success: false,
                                                message: error,
                                                clientMessage: 'Cannot find workday data.'
                                            });
                                            reject();
                                        }
                                    )
                                    .then(
                                        function(workday){
                                            resolve(workday);
                                        },
                                        function(error){
                                            console.log(error);
                                            res.status(500).send({
                                                success: false,
                                                message: error,
                                                clientMessage: 'Cannot create workday data.'
                                            });
                                            reject();
                                        }
                                    );
                                }
                            );
                            arr.push(p);
                        }
                        Promise.all(arr)
                        .then(
                            function(workdays){
                                sol(workdays);
                            },
                            function(error){
                                console.log(error);
                                ject();
                            }
                        );             
                    }
                );   
                arrp.push(pp);
            }
        );
        Promise.all(arrp)
        .then(
            function(workdays){
                res.json({
                    success: true,
                    clientMessage: 'Create workday succeed',
                    data: workdays
                });
            },
            function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create all workday data.'
                });
            }
        );
    }

    //----------------- DELETE -----------------    
    function deleteWorkdays (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        validateField(res, req.body);
        let workdaysDeleted;
        Workday.find({
            doctor: req.body.doctor,
            time: req.body.time
        })
        .then(
            function(workdays){
                let arr = [];
                workdays.forEach(
                    function(workday){
                        let d = moment(workday.date);
                        if(d.day() === moment().day(req.body.day).day()){
                            let p = new Promise(
                                function(resolve, reject){
                                    workday.delete(req.decoded._id, 
                                        function () {
                                            resolve(workday);
                                        },
                                        function (error) {
                                            console.log(error);
                                            res.status(500).send({
                                                success: false,
                                                clientMessage: 'Delete Doctor failed.',
                                                message: error
                                            });
                                            reject();
                                        }
                                    );
                                }
                            );
                            arr.push(p);
                        }
                    }
                );
                return Promise.all(arr);
            },function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get workday data.'
                });
            }
        )
        .then(
            function(workdays) {
                workdaysDeleted = workdays;
                return Appointment.find({
                    workday: {
                        $in: workdays
                    }
                });
            },
            function(error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete Workday failed.',
                    message: error
                });
            }
        )
        .then(
            function(appointments) {
                let arr = [];
                appointments.forEach(
                    function(appointment){
                        let p = new Promise(
                            function(resolve, reject){
                                appointment.delete(req.decoded._id, 
                                    function () {
                                        resolve(appointment);
                                    },
                                    function (error) {
                                        console.log(error);
                                        res.status(500).send({
                                            success: false,
                                            clientMessage: 'Delete Doctor failed.',
                                            message: error
                                        });
                                        reject();
                                    }
                                );
                            }
                        );
                        arr.push(p);
                    }
                );
                return Promise.all(arr);
            },
            function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Cannot find apppointment.',
                    message: error
                });
            }
        )
        .then(
            function(appointments){
                // send SMS and Email to all of appointments
                res.json({
                    success: true,
                    clientMessage: 'Delete Workday succeed.',
                    workdaysDeleted: workdaysDeleted,
                    appointmentsDeleted: appointments
                });
            },
            function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete Apppointment failed.',
                    message: error
                });
            }
        );
    }

    function deleteWorkdayByDoctor (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        if (!req.body.date) {
            utils.responseMissingField(res, 'date');
        }
        if (!req.body.time) {
            utils.responseMissingField(res, 'time');
        }
        let workdayDeleted;
        Workday.findOne({
            doctor: req.params.doctor,
            date: moment(req.body.date).startOf('day'),
            time: req.body.time
        })
        .then(
            function (workday) {
                if (!workday) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No workday with this doctor.'
                    });
                }
                else {
                    return new Promise(
                        function(resolve, reject){
                            workday.delete(req.decoded._id, 
                                function () {
                                    resolve(workday);
                                },
                                function (error) {
                                    console.log(error);
                                    res.status(500).send({
                                        success: false,
                                        clientMessage: 'Delete workday failed.',
                                        message: error
                                    });
                                }
                            );
                        }
                    );
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete workday failed.',
                    message: error
                });
            }
        )
        .then(
            function(workday){
                workdayDeleted = workday;
                return Appointment.find({
                    workday: workday
                });
            },
            function(error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete workday failed.',
                    message: error
                });
            }
        )
        .then(
            function(appointments){
                let arr = [];
                appointments.forEach(
                    function(appointment){
                        let p = new Promise(
                            function(resolve, reject){
                                appointment.delete(req.decoded._id, 
                                    function () {
                                        resolve(appointment);
                                    },
                                    function (error) {
                                        console.log(error);
                                        res.status(500).send({
                                            success: false,
                                            clientMessage: 'Delete Doctor failed.',
                                            message: error
                                        });
                                        reject();
                                    }
                                );
                            }
                        );
                        arr.push(p);
                    }
                );
                return Promise.all(arr);
            },function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Cannot find appointment',
                    message: error
                });
            }
        )
        .then(
            function(appointments){
                // send SMS and Email to all of appointments
                res.json({
                    success: true,
                    clientMessage: 'Delete Workday succeed.',
                    workdayDeleted: workdayDeleted,
                    appointmentsDeleted: appointments
                });
            },
            function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    status: 'Delete Apppointment failed.',
                    message: error
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.day) {
            utils.responseMissingField(res, 'day');
        }
        if (!body.doctor) {
            utils.responseMissingField(res, 'doctor');
        }
        if (!body.time) {
            utils.responseMissingField(res, 'time');
        }
    }
};