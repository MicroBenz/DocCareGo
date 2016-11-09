process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Workday = require('../server/model/Workday');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var doctorToken = "";
describe("Workdays", function(){
    beforeEach(function(done){
        chai.request(server)
        .post('/auth/login')
        .send({
            username: "doctor1",
            password: "doctor1"
        })
        .end(
            function(err, res){
                doctorToken = res.body.data.token;
                done();
            }
        );
    });
    describe("/GET workdays by doctor _id", function(){
        it("it should GET workday by using staff role", function(done){
            let Doctor = require('../server/model/Doctor');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                chai.request(server)
                .get('/api/v1/workdays/'+doctor._id)
                .set("x-access-token",doctorToken)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('data');
                        done();
                    }
                );
            });
        });
    });
    describe("/POST create workday", function(){
        it("it should POST create workday", function(done){
            let Doctor = require('../server/model/Doctor');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                let data = {
                    doctor: doctor,
                    workdays: [
                        {
                            "day": "Tuesday",
                            "time": "AM"
                        },
                        {
                            "day": "Tuesday",
                            "time": "PM"
                        },
                        {
                            "day": "Thursday",
                            "time": "AM"
                        }
                    ]
                };
                chai.request(server)
                .post('/api/v1/workdays')
                .set("x-access-token",doctorToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create workday succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('array');
                        res.body.data.should.have.length(3);
                        done();
                    }
                );
            });
        });
    });
    describe("/DELETE delete workday by doctor _id", function(){
        it("it should DELETE all workday of this doctor", function(done){
            let Doctor = require('../server/model/Doctor');
            let moment = require('moment');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                let data = {
                    date: moment().day(2).toDate(),
                    time: 'AM'
                };
                chai.request(server)
                .delete('/api/v1/workdays/'+doctor._id)
                .set("x-access-token",doctorToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Delete Workday succeed.');
                        res.body.should.have.property('workdayDeleted');
                        res.body.should.have.property('appointmentsDeleted');
                        res.body.workdayDeleted.should.be.a('object');
                        res.body.appointmentsDeleted.should.be.a('array');
                        res.body.appointmentsDeleted.should.be.length(0);
                        done();
                    }
                );
            });
        });
    });
    // describe("/DELETE delete workdays", function(){
    //     it("it should DELETE all workdays", function(done){
    //         let Doctor = require('../server/model/Doctor');
    //         Doctor.findOne({HN:'doctor1'})
    //         .then(function(doctor){
    //             let data = {
    //                 doctor: doctor,
    //                 day: 'Monday',
    //                 time: 'AM'
    //             };
    //             chai.request(server)
    //             .delete('/api/v1/workdays')
    //             .set("x-access-token",doctorToken)
    //             .send(data)
    //             .end(
    //                 function(err, res){
    //                     res.should.have.status(200);
    //                     res.should.be.json; 
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('success',true);
    //                     res.body.should.have.property('clientMessage','Delete Workday succeed.');
    //                     res.body.should.have.property('workdaysDeleted');
    //                     res.body.should.have.property('appointmentsDeleted');
    //                     res.body.workdaysDeleted.should.be.a('array');
    //                     res.body.appointmentsDeleted.should.be.a('array');
    //                     res.body.workdaysDeleted.should.have.length(99);
    //                     res.body.appointmentsDeleted.should.be.length(0);
    //                     done();
    //                 }
    //             );
    //         });
    //     });
    // });
});