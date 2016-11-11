process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var doctorToken = "";
describe("DiagnosisResult", function(){
    before(function(done){
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
    describe("/POST create diagnosisResult", function(){
        it("it should POST create diagnosisResult", function(done){
            let Appointment = require('../server/model/Appointment');
            let Disease = require('../server/model/Disease');
            let Medicine = require('../server/model/Medicine');
            let DiagnosisResult = require('../server/model/DiagnosisResult');
            let diseasesRef = [], medicinesRef = [];
            Disease.find()
            .then(function(diseases){
                diseases.forEach(function(disease){
                    diseasesRef.push(disease.name);
                });
                return Medicine.find();
            })
            .then(function(medicines){
                medicines.forEach(function(medicine){
                    medicinesRef.push(medicine.name);
                });
                return Appointment.findOne();
            })
            .then(function(appointment){
                let data = {
                    appointment: appointment,
                    description: 'diagnosis',
                    diseases: diseasesRef,
                    medicines: medicinesRef,
                    numberOfMedicines: [1,2,3,2,1,3,2,1,1,3]
                };
                chai.request(server)
                .post('/api/v1/diagnosisResults')
                .set("x-access-token",doctorToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create diagnosisResult succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        DiagnosisResult.findById(data._id)
                        .then(function(diagnosisResult){
                            diagnosisResult.delete();
                        });
                        done();
                    }
                );
            });
        });
    });
    describe("/GET diagnosisResult by appointment", function(){
        it("it should GET diagnosisResult by using doctor role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                chai.request(server)
                .get('/api/v1/diagnosisResults/'+appointment._id)
                .set("x-access-token",doctorToken)
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
    describe("/PUT diagnosisResult by appointment", function(){
        it("it should update diagnosisResult by using doctor role", function(done){
            let Appointment = require('../server/model/Appointment');
            let DiagnosisResult = require('../server/model/DiagnosisResult');
            Appointment.findOne()
            .then(function(appointment){
                let data = {
                    description: 'diagnosisResult',
                    diseases: ['disease1'],
                    medicines: ['medicine1'],
                    numberOfMedicines: [1]
                }
                chai.request(server)
                .put('/api/v1/diagnosisResults/'+appointment._id)
                .set("x-access-token",doctorToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Update diagnosisResult succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        done();
                    }
                );
            });
        });
    });
});