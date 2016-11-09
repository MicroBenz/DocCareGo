process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Doctor = require('../server/model/Doctor');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var adminToken = "";
var staffToken = "";
describe("Doctors", function(){
    beforeEach(function(done){
        let p = new Promise(
            function(resolve,reject){
                chai.request(server)
                .post('/auth/login')
                .send({
                    username: "admin",
                    password: "admin"
                })
                .end(
                    function(err, res){
                        adminToken = res.body.data.token;
                        resolve();
                    }
                );
            }
        );
        let q = new Promise(
            function(resolve,reject){
                chai.request(server)
                .post('/auth/login')
                .send({
                    username: "staff1",
                    password: "staff1"
                })
                .end(
                    function(err, res){
                        staffToken = res.body.data.token;
                        resolve();
                    }
                );
            }
        )
        Promise.all([p,q])
        .then(
            function(){
                done();
            }
        );
    });
    describe("/GET doctors", function(){
        it("it should GET all doctors by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('limit',10);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.length(10);
                    // console.log(res.body.data);
                    done();
                }
            )
        });

        it("it should GET all doctors by using staff role", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token",staffToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('limit',10);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.length(10);
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });
});