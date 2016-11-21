module.exports = (app, express) => {
    var userRoutes = express.Router();    
    var User = require('../model/User');
    var utils = require('../utils');

    userRoutes.route('/')
        .get(utils.methodNotAllowed)
        .post(createUser)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);
    
    userRoutes.route('/:username')
        .get(getUserByUsername)
        .post(utils.methodNotAllowed)
        .put(utils.methodNotAllowed)
        .delete(utils.methodNotAllowed);

    app.use('/users', userRoutes);

    // Implementation of CRUD are below.
    //----------------- GET -----------------
    function getUserByUsername (req, res) {
        User.findOne({
            username: req.params.username
        })
        .then(
            function (user) {
                user = user.toObject();
                switch (user.role) {
                    case 'patient': getPatientData(req, res, user);
                    break;

                    case 'doctor': getDoctorData(req, res, user);
                    break;

                    case 'staff': getStaffData(req, res, user);
                    break;

                    case 'nurse': getNurseData(req, res, user);
                    break;

                    case 'pharmacist': getPharmacistData(req, res, user);
                    break;
                }
            }
        );
    }

    //----------------- POST -----------------
    function createUser (req, res) {
        validateField(res, req.body);
        User.findOne({
            username: req.body.username
        })
        .then(
            function (user) {
                if (!user) {
                    switch (req.body.role) {
                        case 'patient': checkHasPatient(req, res).then(createUserByData);
                        break;

                        case 'doctor': checkHasDoctor(req, res).then(createUserByData);
                        break;

                        case 'staff': checkHasStaff(req, res).then(createUserByData);
                        break;

                        case 'nurse': checkHasNurse(req, res).then(createUserByData);
                        break;

                        case 'pharmacist': checkHasPharmacist(req, res).then(createUserByData);
                        break;
                    }
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Bad Request',
                        clientMessage: 'Already has user with this HN.'
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get user data.'
                });
            }
        );
    }

    //----------------- ADDITIONAL FUNCTION ----------------- 
    function validateField (res, body) {
        if (!body.username) {
            utils.responseMissingField(res, 'username');
        }

        if (!body.role) {
            utils.responseMissingField(res, 'role');
        }

        if (!body.email) {
            utils.responseMissingField(res, 'email');
        }

        if (!body.password) {
            utils.responseMissingField(res, 'password');
        }
    }
};

function getPatientData (req, res, user) {
    let Patient = require('../model/Patient');
    Patient.findOne({
        HN: req.params.username
    })
    .then(
        function (patient) {
            if(patient) {
                uesr.preName = patient.preName;
                user.name = patient.name;
                user.surname = patient.surname;
                res.json({
                    success: true,
                    data: user
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no patient with this HN',
                    clientMessage: "No patient with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get patient data"
            });
        }
    );
}

function getDoctorData (req, res, user) {
    let Doctor = require('../model/Doctor');
    Doctor.findOne({
        HN: req.params.username
    })
    .then(
        function (doctor) {
            if(doctor) {
                uesr.preName = doctor.preName;
                user.name = doctor.name;
                user.surname = doctor.surname;
                res.json({
                    success: true,
                    data: user
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no doctor with this HN',
                    clientMessage: "No doctor with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get doctor data"
            });
        }
    );
}

function getStaffData (req, res, user) {
    let Staff = require('../model/Staff');
    Staff.findOne({
        HN: req.params.username
    })
    .then(
        function (staff) {
            if(staff) {
                uesr.preName = staff.preName;
                user.name = staff.name;
                user.surname = staff.surname;
                res.json({
                    success: true,
                    data: user
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no staff with this HN',
                    clientMessage: "No staff with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get staff data"
            });
        }
    );
}

function getNurseData (req, res, user) {
    let Nurse = require('../model/Nurse');
    Nurse.findOne({
        HN: req.params.username
    })
    .then(
        function (nurse) {
            if(nurse) {
                uesr.preName = nurse.preName;
                user.name = nurse.name;
                user.surname = nurse.surname;
                res.json({
                    success: true,
                    data: user
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no nurse with this HN',
                    clientMessage: "No nurse with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get nurse data"
            });
        }
    );
}

function getPharmacistData (req, res, user) {
    let Pharmacist = require('../model/Pharmacist');
    Pharmacist.findOne({
        HN: req.params.username
    })
    .then(
        function (pharmacist) {
            if(pharmacist) {
                uesr.preName = pharmacist.preName;
                user.name = pharmacist.name;
                user.surname = pharmacist.surname;
                res.json({
                    success: true,
                    data: user
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no pharmacist with this HN',
                    clientMessage: "No pharmacist with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get pharmacist data"
            });
        }
    );
}

function createUserByData (data) {
    let User = require('../model/User');
    let bcrypt = require('bcrypt-nodejs');
    let info = {
        username: data.req.body.username,
        role: data.req.body.role,
        email: data.req.body.email,
        password: bcrypt.hashSync(data.req.body.password)
    };
    let user = new User(info);
    user.save()
    .then(
        function (user) {
            user = user.toObject();
            delete user.password;
            user.preName = data.preName;
            user.name = data.name;
            user.surname = data.surname;
            //send SMS and Email to patient    
            let smsService = require('../sms.service');
            let mailService = require('../mail.service');
            let message = `ระบบจัดการการนัดหมาย DocCare Go\nเรียนคุณ${user.preName}${user.name} ${user.surname}\nขอบคุณที่ท่านได้ทำการสมัครสมาชิกเพื่อเข้าใช้งานระบบการนัดหมาย DocCare Go\nคุณสามารถเข้าสู่ระบบการนัดหมาย DocCare Go ได้ทันทีโดยใช้รหัส HN และรหัสผ่านของท่าน ในการเข้าสู่ระบบ โดยสามารถใช้งานได้ผ่านเว็บไซต์ <link>`;
            smsService.sendSMS(data.tel, message);
            mailService.sendEmail(user.email, 'Doccare Go Notice', message);
                
            data.res.json({
                success: true,
                message: 'created user completed',
                clientMessage: 'Register completed',
                data: user
            });
        },
        function (error) {
            console.log(error);
            data.res.status(500).send({
                success: false,
                message: error,
                clientMessage: 'Cannot save user data.'
            });
        }
    );
}

function checkHasPatient (req, res) {
    let Patient = require('../model/Patient');
    return Patient.findOne({
        HN: req.body.username
    })
    .then(
        function (patient) {
            if(patient) {
                return {
                    req: req,
                    res: res,
                    preName: patient.preName,
                    name: patient.name,
                    surname: patient.surname,
                    tel: patient.tel
                };
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no patient with this HN',
                    clientMessage: "No patient with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get patient data"
            });
        }
    );
}

function checkHasDoctor (req, res) {
    let Doctor = require('../model/Doctor');
    return Doctor.findOne({
        HN: req.body.username
    })
    .then(
        function (doctor) {
            if(doctor) {
                return {
                    req: req,
                    res: res,
                    preName: doctor.preName,
                    name: doctor.name,
                    surname: doctor.surname,
                    tel: doctor.tel
                };
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no doctor with this HN',
                    clientMessage: "No doctor with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get doctor data"
            });
        }
    );
}

function checkHasStaff (req, res) {
    let Staff = require('../model/Staff');
    Staff.findOne({
        HN: req.body.username
    })
    .then(
        function (staff) {
            if(staff) {
                return {
                    req: req,
                    res: res,
                    preName: staff.preName,
                    name: staff.name,
                    surname: staff.surname,
                    tel: staff.tel
                };
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no staff with this HN',
                    clientMessage: "No staff with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get staff data"
            });
        }
    );
}

function checkHasNurse (req, res) {
    let Nurse = require('../model/Nurse');
    return Nurse.findOne({
        HN: req.body.username
    })
    .then(
        function (nurse) {
            if(nurse) {
                return {
                    req: req,
                    res: res,
                    preName: nurse.preName,
                    name: nurse.name,
                    surname: nurse.surname,
                    tel: staff.tel
                };
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no nurse with this HN',
                    clientMessage: "No nurse with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get nurse data"
            });
        }
    );
}

function checkHasPharmacist (req, res) {
    let Pharmacist  = require('../model/Pharmacist ');
    return Pharmacist .findOne({
        HN: req.body.username
    })
    .then(
        function (pharmacist ) {
            if(pharmacist) {
                return {
                    req: req,
                    res: res,
                    preName: pharmacist.preName,
                    name: pharmacist.name,
                    surname: pharmacist.surname,
                    tel: pharmacist.tel
                };
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'no pharmacist with this HN',
                    clientMessage: "No pharmacist with this HN"
                });
            }
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: "Cannot get pharmacist data"
            });
        }
    );
}