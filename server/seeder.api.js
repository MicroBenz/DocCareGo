module.exports = function (app, express) {
    var seederRoutes = express.Router();
    seederRoutes.post('/default/data', createDefaultData);
    seederRoutes.post('/default/user', createDefaultUser);
    seederRoutes.post('/admin', createAdmin);

    seederRoutes.post('/patients', createPatients);
    seederRoutes.post('/doctors', createDoctors);
    seederRoutes.post('/staffs', createStaffs);
    seederRoutes.post('/nurses', createNurses);
    seederRoutes.post('/pharmacists', createPharmacists);

    seederRoutes.post('/users/patients', createUsersPatients);
    seederRoutes.post('/users/doctors', createUsersDoctors);
    seederRoutes.post('/users/staffs', createUsersStaffs);
    seederRoutes.post('/users/nurses', createUsersNurses);
    seederRoutes.post('/users/pharmacists', createUsersPharmacists);

    app.use('/seed', seederRoutes);
}

function createDefaultData (req, res) {
    createPatients(req, res);
    createDoctors(req, res);
    createStaffs(req, res);
    createNurses(req, res);
    createPharmacists(req, res);
    res.json({
        success: true,
        clientMessage: 'Created data of patients, doctors, staffs, nurses and pharmacists.'
    });
}

function createDefaultUser (req, res) {
    createUsersPatients(req, res);
    createUsersDoctors(req, res);
    createUsersStaffs(req, res);
    createUsersNurses(req, res);
    createUsersPharmacists(req, res);
    res.json({
        success: true,
        clientMessage: 'Created user of patients, doctors, staffs, nurses and pharmacists.'
    });
}

function createPatiens (req, res) {
    "use strict";
    var Patient = require('../model/Patient.js');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'patient'+i,
            personalID: 'patient'+i,
            preName: 'นาย',
            name: 'ผู้ป่วย'+i,
            surname: 'สมมติป่วย'+i,
            houseNumber: 'บ้านเลขที่'+i,
            road: 'ถนน'+i,
            soi: 'ซอย'+i,
            subdistrict: 'เขต'+i,
            district: 'แขวง'+i,
            province: 'จังหวัด'+i,
            zipCode: 'รหัสไปรษณีย์'+i,
            tel: 'เบอร์โทร'+i
        };
        let patient = new Patient(data);
        patient.save()
        .then(
            function (patient) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create patient:'+i+' data.'
                });
            }
        );
    }
}

function createDoctors (req, res) {
    "use strict";
    var Doctor = require('../model/Doctor.js');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'doctor'+i,
            personalID: 'doctor'+i,
            preName: 'นาย',
            name: 'หมอ'+i,
            surname: 'สมมติหมอ'+i,
            clinic: {}
        };
        let doctor = new Doctor(data);
        doctor.save()
        .then(
            function (doctor) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create doctor:'+i+' data.'
                });
            }
        );
    }
}

function createStaffs (req, res) {
    "use strict";
    var Staff = require('../model/Staff.js');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'staff'+i,
            personalID: 'staff'+i,
            preName: 'นาย',
            name: 'เจ้าหน้าที่'+i,
            surname: 'สมมติเจ้าหน้าที่'+i,
        };
        let staff = new Staff(data);
        staff.save()
        .then(
            function (staff) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create staff:'+i+' data.'
                });
            }
        );
    }
}

function createNurses (req, res) {
    "use strict";
    var Nurse = require('../model/Nurse.js');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'nurse'+i,
            personalID: 'nurse'+i,
            preName: 'นาย',
            name: 'พยาบาล'+i,
            surname: 'สมมติพยาบาล'+i
        };
        let nurse = new Nurse(data);
        nurse.save()
        .then(
            function (nurse) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create nurse:'+i+' data.'
                });
            }
        );
    }
}

function createPharmacists (req, res) {
    "use strict";
    var Pharmacist = require('../model/Pharmacist.js');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'pharmacist'+i,
            personalID: 'pharmacist'+i,
            preName: 'นาย',
            name: 'เภสัช'+i,
            surname: 'สมมติเภสัช'+i
        };
        let pharmacist = new Pharmacist(data);
        pharmacist.save()
        .then(
            function (pharmacist) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create pharmacist:'+i+' data.'
                });
            }
        );
    }
}

function createAdmin (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    let data = {
        HH: 'admin',
        role: 'admin',
        email: 'admin@doccare.go.th',
        password: bcrypt.hashSync('admin')
    };
    let user = new User(data);
    user.save()
    .then(
        function (user) {
            res.json({
                success: true,
                clientMessage: 'Created admin.'
            });
        },
        function (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error,
                clientMessage: 'Cannot create admin data.'
            });
        }
    );
}

function createUsersPatients (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'patient'+i,
            role: 'patient',
            email: 'patient'+i+'@doccare.go.th',
            password: bcrypt.hashSync('patient'+i)
        };
        let user = new User(data);
        user.save()
        .then(
            function (user) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create user patient:'+i+' data.'
                });
            }
        );
    }
}

function createUsersDoctors (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'doctor'+i,
            role: 'doctor',
            email: 'doctor'+i+'@doccare.go.th',
            password: bcrypt.hashSync('doctor'+i)
        };
        let user = new User(data);
        user.save()
        .then(
            function (user) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create user doctor:'+i+' data.'
                });
            }
        );
    }
}

function createUsersStaffs (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'staff'+i,
            role: 'staff',
            email: 'staff'+i+'@doccare.go.th',
            password: bcrypt.hashSync('staff'+i)
        };
        let user = new User(data);
        user.save()
        .then(
            function (user) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create user staff:'+i+' data.'
                });
            }
        );
    }
}

function createUsersNurses (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'nurse'+i,
            role: 'nurse',
            email: 'nurse'+i+'@doccare.go.th',
            password: bcrypt.hashSync('nurse'+i)
        };
        let user = new User(data);
        user.save()
        .then(
            function (user) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create user nurse:'+i+' data.'
                });
            }
        );
    }
}

function createUsersPharmacists (req, res) {
    "use strict";
    var User = require('../model/User.js');
    var bcrypt = require('bcrypt-nodejs');
    for(int i=1; i<=10; i++){
        let data = {
            HH: 'pharmacist'+i,
            role: 'pharmacist',
            email: 'pharmacist'+i+'@doccare.go.th',
            password: bcrypt.hashSync('pharmacist'+i)
        };
        let user = new User(data);
        user.save()
        .then(
            function (user) {
            },
            function (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: error,
                    clientMessage: 'Cannot create user pharmacist:'+i+' data.'
                });
            }
        );
    }
}