module.exports = (apiRoutes, express) => {
    var workdayRoutes = express.Router();    
    var Workday = require('../model/Workday');
    var Clinic = require('../model/Clinic');
    var Doctor = require('../model/Doctor');    
    var Appointment = require('../model/Appointment');
    var utils = require('../utils');
    var moment = require('moment');

    workdayRoutes.route('/')
        .get(getWorkdays)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
        // .delete(deleteWorkdays);
    
    workdayRoutes.route('/:doctor')
        .get(getWorkdayByDoctor)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(deleteWorkdayById);

    apiRoutes.use('/workdays', workdayRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getWorkdays (req, res) {
        utils.checkRole(req, res, ['staff','patient']);
        var filterField = req.query.filters;
        if (filterField) {
            filterField = filterField.split(',').join(' ');
        }
        else {
            filterField = '';
        }
        if (req.query.doctor) {
            Workday.find({
                doctor: req.query.doctor,
                date: {
                    $gte: moment().startOf('day')
                }
            })
            .populate('doctor')
            .sort({
                date: 'asc'
            })
            .select(filterField)
            .then(
                function (workdays) {
                    res.json({
                        success: true,
                        data: workdays
                    });
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
        else if (req.query.clinic) {
            Doctor.find({
                clinic: req.query.clinic
            })
            .then(
                function(doctors){
                    return Workday.find({
                        doctor: {
                            $in: doctors
                        },
                        date: {
                            $gte: moment().startOf('day')
                        }
                    })
                    .populate('doctor')
                    .sort({
                        date: 'asc'
                    })
                    .select(filterField);
                },
                function (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: error,
                        clientMessage: 'Cannot get doctor data.'
                    });
                }
            )
            .then(
                function (workdays) {
                    res.json({
                        success: true,
                        data: workdays
                    });
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
        else{
            res.status(400).send({
                success: false,
                message: 'Bad Request',
                clientMessage: 'Cannot get api without query.'
            });
        }
    }

    function getWorkdayByDoctor (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        if (!req.query.month) {
            utils.responseMissingField(res, 'month');
        }
        if (!req.query.year) {
            utils.responseMissingField(res, 'year');
        }
        Workday.find({
            doctor: req.params.doctor,
            date: {
                $gte: moment({year: req.query.year, month: req.query.month, day: 1}).startOf('day'),
                $lt: moment({year: req.query.year, month: req.query.month, day: 1}).add(1,'month').startOf('day')
            }
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
                })
                .populate('patient')
                .populate('doctor')
                .populate('workday');
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
                //send SMS and Email to patient
                let smsService = require('../sms.service');
                let mailService = require('../mail.service');
                appointments.forEach(
                    function(appointment){
                        let message = `ระบบจัดการการนัดหมาย DocCare Go\nเรียนคุณ${appointment.patient.preName}${appointment.patient.name} ${appointment.patient.surname}\nเนื่องจากแพทย์เจ้าของนัด ${appointment.doctor.preNmae}${appointment.doctor.name} ${appointment.doctor.surname} ไม่สามารถทำการออกตรวจในวันและเวลานัดหมายเดิม (วันที่ ${moment(appointment.workday.date).locale('th').format('LL')} เวลา ${appointment.workday.time==="AM"?"9:00-11:30":"13:00-15:30"} ) รบกวนท่านติดต่อโดยตรงกับเจ้าหน้าที่ทางโทรศัพท์ (เบอร์โทรศัพท์: 0xx-xxx-xxxx) เพื่อนัดหมายใหม่ต่อไป\nทางโรงพยาบาลต้องขออภัยในความไม่สะดวกมา ณ ที่นี้ด้วย`;
                        smsService.sendSMS(appointment.patient.tel, message)
                        .subscribe(
                            (success) => {
                                console.log(success);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                        User.findOne({
                            username: appointment.patient.HN
                        })
                        .then(
                            function(user){
                                mailService.sendEmail(user.email, 'Doccare Go Notice', message);
                            },function(error){
                                console.log(error);
                            }
                        );
                    }
                );

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

    function deleteWorkdayById (req, res) {
        utils.checkRole(req, res, ['doctor','staff']);
        let workdayDeleted;
        Workday.findById(req.params.doctor)
        .then(
            function (workday) {
                if (!workday) {
                    res.status(400).send({
                        success: false,
                        status: 'Bad Request',
                        message: 'No workday with this id.'
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