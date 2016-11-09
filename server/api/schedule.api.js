module.exports = (apiRoutes, express) => {
    var scheduleRoutes = express.Router();    
    var Workday = require('../model/Workday');
    var Schedule = require('../model/Schedule');
    var Appointment = require('../model/Appointment');
    var utils = require('../utils');
    var moment = require('moment');

    scheduleRoutes.route('/')
        .get(utils.methodNotAllowed)
        .post(createSchedule)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
        // .delete(deleteWorkdays);
    
    scheduleRoutes.route('/:doctor')
        .get(getScheduleByDoctor)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);

    apiRoutes.use('/schedules', scheduleRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getScheduleByDoctor (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        Schedule.find({
            doctor: req.params.doctor
        })
        .populate('doctor')
        .then(
           function (schedule) {
                if (!schedule) {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'No schedule with this id.'
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: schedule
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get schedule data.'
                });
            }
        );
    }

    //----------------- POST -----------------
    function createSchedule (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        if (!req.body.doctor) {
            utils.responseMissingField(res, 'doctor');
        }
        if (!req.body.schedules) {
            utils.responseMissingField(res, 'schedules');
        }
        let arrp = [];
        req.body.schedules.forEach(
            function(schedule){
                let pp = new Promise(
                    function(sol,ject){
                        let d = moment().day(schedule.day).startOf('day');
                        let arr = [];
                        for(let i=0; i<100; i++, d.add(7,'day')){
                            let data = {
                                doctor: req.body.doctor,
                                date: d.toDate(),
                                time: schedule.time
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
            function(){
                let arr = [];
                req.body.schedules.forEach(
                    function(schedule){
                        let data = {
                            doctor: req.body.doctor,
                            day: schedule.day,
                            time: schedule.time
                        };
                        let p = new Promise(
                            function(resolve,reject){
                                let s = new Schedule(data);
                                s.save()
                                .then(
                                    function(schedule){
                                        resolve(schedule);
                                    },
                                    function(error){
                                        console.log(error);
                                        res.status(500).send({
                                            success: false,
                                            message: error,
                                            clientMessage: 'Cannot create schedule data.'
                                        });
                                        reject();
                                    }
                                );
                            }
                        );
                        arr.push(p);
                    }
                );
                Promise.all(arr)
                .then(
                    function(schedules){
                        res.json({
                            success: true,
                            clientMessage: 'Create schedule succeed',
                            data: schedules
                        });
                    },function(error){
                        console.log(error);
                        res.status(500).send({
                            success: false,
                            message: error,
                            clientMessage: 'Cannot create all schedule data.'
                        });
                    }
                );
            }
        );
    }
};