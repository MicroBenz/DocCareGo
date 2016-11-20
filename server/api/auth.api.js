module.exports = function (app, express) {
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcrypt-nodejs');
    var User = require('../model/User');
    var Patient = require('../model/Patient');
    var utils = require('../utils');
    var authRoutes = express.Router();
    
    authRoutes.post('/login', login);
    authRoutes.get('/generateNewHN', generateNewHN);
    authRoutes.post('/newPatient', createPatient);

    function login (req, res) {
        User.findOne({
            username: req.body.username
        })
        .then(
            function (user) {
                if(user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        user = user.toObject();
                        switch (user.role) {
                            case 'patient': getPatientName(res, user).then(createToken);
                            break;

                            case 'doctor': getDoctorName(res, user).then(createToken);
                            break;

                            case 'staff': getStaffName(res, user).then(createToken);
                            break;

                            case 'nurse': getNurseName(res, user).then(createToken);
                            break;

                            case 'pharmacist': getPharmacistName(res, user).then(createToken);
                            break;

                            case 'admin': user.name = 'ผู้ดูแลระบบ';
                            createToken({res: res, user: user});
                            break;
                        }
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            message: 'Login Fail!',
                            clientMessage: "Wrong password"
                        });
                    }
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Login Fail!',
                        clientMessage: "No this username in DocCareGo"
                    });
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: "Cannot get user data"
                });
            }
        );
    }

    function generateNewHN (req, res) {
        Patient.find({})
        .then(
            function(patients){
                let arr = [];
                patients.forEach(
                    function(patient){
                        if(patient.HN)
                            arr.push(patient.HN);
                    }
                );
                let num;
                do{
                    num = Math.random();
                    if( num < 0.1 )
                        num += 0.1;
                    num = Math.floor(num*1000000);
                }
                while(patients.includes(num));
                res.json({
                    success: true,
                    clientMessage: 'Generate new HN succeed',
                    data: {
                        HN: num
                    }
                });
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patient data.'
                });
            }
        )
    }
    function createPatient (req, res) {
        validateField(res, req.body);
        Patient.findOneWithDeleted({
            $or: [
                { HN: req.body.HN },
                { personalID: req.body.personalID }
            ]
        })
        .then(
            function (patient) {
                if (patient) {
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
                        surname: req.body.surname,
                        houseNumber: req.body.houseNumber,
                        road: req.body.road,
                        soi: req.body.soi,
                        subdistrict: req.body.subdistrict,
                        district: req.body.district,
                        province: req.body.province,
                        zipCode: req.body.zipCode,
                        country: req.body.country,
                        tel: req.body.tel,
                        noMedicines: req.body.noMedicines,
                    };
                }
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot get patient data.'
                });
            }
        )
        .then(
            function (patientData) {
                var patient = new Patient(patientData);
                return patient.save();
            }
        )
        .then(
            function (patient) {
                res.json({
                    success: true,
                    clientMessage: 'Create patient succeed',
                    data: patient
                });
            },
            function (error) {
                res.status(500).send({
                    success: false,
                    clientMessage: 'Create patient failed',
                    message: error
                });
            }
        );
    }

    app.use('/auth', authRoutes);

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

        if (!body.district) {
            utils.responseMissingField(res, 'district');
        }

        if (!body.province) {
            utils.responseMissingField(res, 'province');
        }

        if (!body.zipCode) {
            utils.responseMissingField(res, 'zipCode');
        }

        if (!body.country) {
            utils.responseMissingField(res, 'country');
        }
    }

    function createToken (data) {
        user = data.user;
        delete data.user.password;
        var token = jwt.sign(data.user, app.get('tokenSecret'), {
            expiresIn: 1440*60
        });

        data.res.json({
            success: true,
            message: 'Login Success',
            data: {
                token: token,
                role: data.user.role
            }
        });
    }
};

function getPatientName (res, user) {
    let Patient = require('../model/Patient');
    return Patient.findOne({
        HN: user.username
    })
    .then(
        function (patient) {
            if(patient) {
                user._id = patient._id;
                user.name = patient.name;
                return {
                    res: res,
                    user: user
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

function getDoctorName (res, user) {
    let Doctor = require('../model/Doctor')
    return Doctor.findOne({
        HN: user.username
    })
    .then(
        function (doctor) {
            if(doctor) {
                user._id = doctor._id;
                user.name = doctor.name;
                return {
                    res: res,
                    user: user
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

function getStaffName (res, user) {
    let Staff = require('../model/Staff')
    return Staff.findOne({
        HN: user.username
    })
    .then(
        function (staff) {
            if(staff) {
                user._id = staff._id;
                user.name = staff.name;
                return {
                    res: res,
                    user: user
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

function getNurseName (res, user) {
    let Nurse = require('../model/Nurse')
    return Nurse.findOne({
        HN: user.username
    })
    .then(
        function (nurse) {
            if(nurse) {
                user._id = nurse._id;
                user.name = nurse.name;
                return {
                    res: res,
                    user: user
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

function getPharmacistName (res, user) {
    let Pharmacist = require('../model/Pharmacist')
    return Pharmacist.findOne({
        HN: user.username
    })
    .then(
        function (pharmacist) {
            if(pharmacist) {
                user._id = pharmacist._id;
                user.name = pharmacist.name;
                return {
                    res: res,
                    user: user
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