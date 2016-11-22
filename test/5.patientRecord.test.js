process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var nurseToken = "";
describe("PatientRecord", function(){
    before(function(done){
        chai.request(server)
        .post('/auth/login')
        .send({
            username: "nurse1",
            password: "nurse1"
        })
        .end(
            function(err, res){
                nurseToken = res.body.data.token;
                done();
            }
        );
    });
    describe("/POST create patientRecord", function(){
        it("it should POST create patientRecord", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                let data = {
                    appointment: appointment._id,
                    weight: 72.5,
                    height: 167,
                    temperature: 37.3,
                    heartRate: 120,
                    systolic: 80,
                    diastolic: 100
                };
                chai.request(server)
                .post('/api/v1/patientRecords')
                .set("x-access-token",nurseToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create PatientRecord succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        done();
                    }
                );
            });
        });
    });
    describe("/GET all patientRecords", function(){
        it("it should GET all patientRecords by using nurse role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                chai.request(server)
                .get('/api/v1/patientRecords')
                .set("x-access-token",nurseToken)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('array');
                        res.body.data.should.have.length(1);
                        done();
                    }
                );
            });
        });
    });
    describe("/GET patientRecord by appointment", function(){
        it("it should GET patientRecord by using nurse role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                chai.request(server)
                .get('/api/v1/patientRecords/'+appointment._id)
                .set("x-access-token",nurseToken)
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
    describe("/PUT patientRecord by appointment", function(){
        it("it should update patientRecord by using nurse role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                let data = {
                    appointment: appointment._id,
                    weight: 72.5,
                    height: 167,
                    temperature: 37.3,
                    heartRate: 120,
                    systolic: 80,
                    diastolic: 100
                };
                chai.request(server)
                .put('/api/v1/patientRecords/'+appointment._id)
                .set("x-access-token",nurseToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Update patientRecord succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        done();
                    }
                );
            });
        });
    });
});