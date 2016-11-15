process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var doctorToken = "";
describe("Schedule", function(){
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
    describe("/GET schedule by doctor _id", function(){
        it("it should GET schedule by using doctor role", function(done){
            let Doctor = require('../server/model/Doctor');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                chai.request(server)
                .get('/api/v1/schedules/'+doctor._id)
                .set("x-access-token",doctorToken)
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
    describe("/POST create schedule", function(){
        it("it should POST create schedule", function(done){
            let Doctor = require('../server/model/Doctor');
            let moment = require('moment');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                let data = {
                    doctor: doctor,
                    schedules: [
                        {
                            "day": moment().day(),
                            "time": "AM"
                        },
                        {
                            "day": moment().day(),
                            "time": "PM"
                        },
                        {
                            "day": moment().add(1,'day').day(),
                            "time": "AM"
                        }
                    ]
                };
                chai.request(server)
                .post('/api/v1/schedules')
                .set("x-access-token",doctorToken)
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create schedule succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('array');
                        res.body.data.should.have.length(3);
                        done();
                    }
                );
            });
        });
    });
});