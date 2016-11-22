process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var staffToken = "";
describe("Appointment", function(){
    before(function(done){
        chai.request(server)
        .post('/auth/login')
        .send({
            username: "staff1",
            password: "staff1"
        })
        .end(
            function(err, res){
                staffToken = res.body.data.token;
                done();
            }
        );
    });
    describe("/POST create appointment", function(){
        it("it should POST create appointment", function(done){
            let Patient = require('../server/model/Patient');
            let Doctor = require('../server/model/Doctor');
            let Workday = require('../server/model/Workday');
            let moment = require('moment');
            let patientRef, doctorRef;
            Patient.findOne({HN:'patient1'})
            .then(function(patient){
                patientRef = patient;
                return Doctor.findOne({HN:'doctor1'});
            })
            .then(function(doctor){
                doctorRef = doctor;
                return Workday.findOne({
                    doctor: doctor,
                    date: moment().startOf('day').toDate()
                });
            })
            .then(function(workday){
                let data = {
                    description: 'appointment',
                    patient: patientRef.HN,
                    doctor: doctorRef.HN,
                    workday: workday
                };
                chai.request(server)
                .post('/api/v1/appointments')
                .set("x-access-token",staffToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create appointment succeed.');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        done();
                    }
                );
            });
        });
    });
    describe("/GET appointments", function(){
        it("it should GET appointment query by user", function(done){
            chai.request(server)
            .get('/api/v1/appointments?user=patient1')
            .set("x-access-token",staffToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    done();
                }
            );
        });
        it("it should GET appointment query by user", function(done){
            let Doctor = require('../server/model/Doctor');
            let Workday = require('../server/model/Workday');
            let moment = require('moment');
            Doctor.findOne({
                HN: 'doctor1'
            })
            .then(
                function(doctor){
                    return Workday.findOne({
                        doctor: doctor,
                        date: moment().startOf('day').toDate()
                    });
                }
            )
            .then(function(workday){
                chai.request(server)
                .get('/api/v1/appointments?workday='+workday._id)
                .set("x-access-token",staffToken)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('array');
                        done();
                    }
                );
            });
        });
    });
    describe("/GET appointment by id", function(){
        it("it should GET appointment by using staff role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                chai.request(server)
                .get('/api/v1/appointments/'+appointment._id)
                .set("x-access-token",staffToken)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        done();
                    }
                );
            });
        });
    });
});