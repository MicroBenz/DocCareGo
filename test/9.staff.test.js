process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Staff = require('../server/model/Staff');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var adminToken = "";
var patientToken = "";
describe("Staffs", function(){
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


    describe("/POST create staff", function(){
        it("it should POST create staff", function(done){
            let data = {
                HN: 'newstaff',
                personalID: 'newstaff',
                preName: 'Mr.',
                name: 'Benz',
                surname: 'Thananan',
            };
            chai.request(server)
            .post('/api/v1/staffs')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Create staff succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });

        it("it should POST create staff with same HN, so it will be fail.", function(done){
            let data = {
                HN: 'newstaff',
                personalID: 'newstaff',
                preName: 'Miss',
                name: 'Eve',
                surname: 'Wantanee',
            };
            chai.request(server)
            .post('/api/v1/staffs')
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

    describe("/GET staffs", function(){
        it("it should GET all staffs by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/staffs')
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
            .get('/api/v1/staffs')
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

    describe("/GET staffs by HN", function(){
        it("it should GET staffs by HN using admin role", function(done){
            let HN = 'newstaff';
            chai.request(server)
            .get('/api/v1/staffs/'+HN)
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
            .get('/api/v1/staffs/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'No staff with this HN.');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });

    describe("/PUT update staff by HN", function(){
        it("it should PUT create staff", function(done){
            let HN = 'newstaff';
            let data = {
                HN: 'newstaff',
                personalID: 'newstaff',
                preName: 'Mr.',
                name: 'BenzUpdate',
                surname: 'ThanananUpdate',
            };
            chai.request(server)
            .put('/api/v1/staffs/'+HN)
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Update staff succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });
    });

    describe("/DELETE delete staff by HN", function(){
        it("it should Delete create staff", function(done){
            let HN = 'newstaff';
            chai.request(server)
            .delete('/api/v1/staffs/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    // res.should.be.json; 
                    // res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Delete staff succeed.');
                    res.body.should.have.property('message','Delete staff succeed.');
                    done();
                }
            );
        });
    });


});