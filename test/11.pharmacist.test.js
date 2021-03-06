process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Pharmacist = require('../server/model/Pharmacist');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var adminToken = "";
var patientToken = "";
describe("Pharmacists", function(){
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


    describe("/POST create pharmacist", function(){
        it("it should POST create pharmacist", function(done){
            let data = {
                HN: 'newpharmacist',
                personalID: 'newpharmacist',
                preName: 'Mr.',
                name: 'Benz',
                surname: 'Thananan',
            };
            chai.request(server)
            .post('/api/v1/pharmacists')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Create pharmacist succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });

        it("it should POST create pharmacist with same HN, so it will be fail.", function(done){
            let data = {
                HN: 'newpharmacist',
                personalID: 'newpharmacist',
                preName: 'Miss',
                name: 'Eve',
                surname: 'Wantanee',
            };
            chai.request(server)
            .post('/api/v1/pharmacists')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'This HN or personalID has already in the system');
                    done();
                }
            );
        });
    });

    describe("/GET pharmacists", function(){
        it("it should GET all pharmacists by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/pharmacists')
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
            .get('/api/v1/pharmacists')
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

    describe("/GET pharmacists by HN", function(){
        it("it should GET pharmacists by HN using admin role", function(done){
            let HN = 'newpharmacist';
            chai.request(server)
            .get('/api/v1/pharmacists/'+HN)
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
        
        it("Using wrong HN to GET/:HN, so it should show error", function(done){
            let HN = '000000';
            chai.request(server)
            .get('/api/v1/pharmacists/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'No pharmacist with this HN.');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });

    describe("/PUT update pharmacist by HN", function(){
        it("it should PUT create pharmacist", function(done){
            let HN = 'newpharmacist';
            let data = {
                HN: 'newpharmacist',
                personalID: 'newpharmacist',
                preName: 'Mr.',
                name: 'BenzUpdate',
                surname: 'ThanananUpdate',
            };
            chai.request(server)
            .put('/api/v1/pharmacists/'+HN)
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Update pharmacist succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });
    });

    describe("/DELETE delete pharmacist by HN", function(){
        it("it should Delete create pharmacist", function(done){
            let HN = 'newpharmacist';
            chai.request(server)
            .delete('/api/v1/pharmacists/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    // res.should.be.json; 
                    // res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Delete pharmacist succeed.');
                    res.body.should.have.property('message','Delete pharmacist succeed.');
                    done();
                }
            );
        });
    });


});