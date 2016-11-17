process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Clinic = require('../server/model/Clinic');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var adminToken = "";
var patientToken = "";
describe("Clinics", function(){
    before(function(done){
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
                    username: "patient1",
                    password: "patient1"
                })
                .end(
                    function(err, res){
                        patientToken = res.body.data.token;
                        resolve();
                    }
                );
            }
        );
        Promise.all([p,q])
        .then(
            function(){
                done();
            }
        );
    });


    describe("/POST create clinic", function(){
        it("it should POST create clinic", function(done){
            let data = {
                name: 'newclinic',
                description: 'newclinic'
            };
            chai.request(server)
            .post('/api/v1/clinics')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Create clinic succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });

        it("it should POST create clinic with same name, so it will be fail.", function(done){
            let data = {
                name: 'newclinic',
                description: 'newclinic',
            };
            chai.request(server)
            .post('/api/v1/clinics')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'This name has already in the system');
                    done();
                }
            );
        });
    });

    describe("/GET clinics", function(){
        it("it should GET all clinics by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/clinics')
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

        it("Using patient role, so it should show error", function(done){
            chai.request(server)
            .get('/api/v1/clinics')
            .set("x-access-token",patientToken)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('status','Bad Request');
                    res.body.should.have.property('message', 'This API is not allowed for your role.');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });

    describe("/GET clinics by name", function(){
        it("it should GET clinics by name using admin role", function(done){
            let name = 'newclinic';
            chai.request(server)
            .get('/api/v1/clinics/'+name)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
        
        it("Using wrong name to GET/:name, so it should show error", function(done){
            let name = '000000';
            chai.request(server)
            .get('/api/v1/clinics/'+name)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'No clinic with this name.');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });

    describe("/PUT update clinic by name", function(){
        it("it should PUT create clinic", function(done){
            let name = 'newclinic';
            let data = {
                name: 'newclinic',
                description: 'newclinic'
            };
            chai.request(server)
            .put('/api/v1/clinics/'+name)
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Update clinic succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });
    });

    describe("/DELETE delete clinic by name", function(){
        it("it should Delete create clinic", function(done){
            let name = 'newclinic';
            chai.request(server)
            .delete('/api/v1/clinics/'+name)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    // res.should.be.json; 
                    // res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Delete clinic succeed.');
                    res.body.should.have.property('message','Delete clinic succeed.');
                    done();
                }
            );
        });
    });


});