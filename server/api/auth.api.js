module.exports = function (app, express) {
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcrypt-nodejs');
    var User = require('../model/User');
    var authRoutes = express.Router();
    
    authRoutes.post('/login', login);

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

    app.use('/auth', authRoutes);

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