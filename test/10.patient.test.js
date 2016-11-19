process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Patient = require('../server/model/Patient');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var adminToken = "";
var patientToken = "";
describe("Patient", function(){
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


    describe("/POST create patient", function(){
        it("it should POST create patient", function(done){
            let data = {
                HN: 'newpatient',
                personalID: 'newpatient',
                preName: 'Mr.',
                name: 'Benz',
                surname: 'Thananan',
                houseNumber: '1',
                road: 'road',
                soi: 'soi',
                subdistrict: 'subdistrict',
                district: 'district',
                province: 'province',
                zipCode: 'zipCode',
                country: 'country',
                tel: 'tel',
                noMedicines: ['ยา1','ยา2']
            };
            chai.request(server)
            .post('/api/v1/patients')
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Create patient succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });

        it("it should POST create patient with same HN, so it will be fail.", function(done){
            let data = {
                HN: 'newpatient',
                personalID: 'newpatient',
                preName: 'Miss',
                name: 'Eve',
                surname: 'Wantanee',
                houseNumber: '1',
                road: 'road',
                soi: 'soi',
                subdistrict: 'subdistrict',
                district: 'district',
                province: 'province',
                zipCode: 'zipCode',
                country: 'country',
                tel: 'tel'
            };
            chai.request(server)
            .post('/api/v1/patients')
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

    describe("/GET patients", function(){
        it("it should GET all patients by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/patients')
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
            .get('/api/v1/patients')
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

    describe("/GET patients by HN", function(){
        it("it should GET patients by HN using admin role", function(done){
            let HN = 'newpatient';
            chai.request(server)
            .get('/api/v1/patients/'+HN)
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
            .get('/api/v1/patients/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(400);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('message','Bad Request');
                    res.body.should.have.property('clientMessage', 'No patient with this HN.');
                    // console.log(res.body.data);
                    done();
                }
            )
        });
    });

    describe("/PUT update patient by HN", function(){
        it("it should PUT create patient", function(done){
            let HN = 'newpatient';
            let data = {
                HN: 'newpatient',
                personalID: 'newpatient',
                preName: 'Mr.',
                name: 'BenzUpdate',
                surname: 'ThanananUpdate',
                houseNumber: '1',
                road: 'road',
                soi: 'soi',
                subdistrict: 'subdistrict',
                district: 'district',
                province: 'province',
                zipCode: 'zipCode',
                country: 'country',
                tel: 'tel',
                noMedicines: ['ยา1','ยา2']
            };
            chai.request(server)
            .put('/api/v1/patients/'+HN)
            .set("x-access-token",adminToken)
            .send(data)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    res.should.be.json; 
                    res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Update patient succeed');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                }
            );
        });
    });

    describe("/DELETE delete patient by HN", function(){
        it("it should Delete create patient", function(done){
            let HN = 'newpatient';
            chai.request(server)
            .delete('/api/v1/patients/'+HN)
            .set("x-access-token",adminToken)
            .end(
                function(err, res){
                    res.should.have.status(200);
                    // res.should.be.json; 
                    // res.body.should.be.a('object');
                    res.body.should.have.property('success',true);
                    res.body.should.have.property('clientMessage','Delete patient succeed.');
                    res.body.should.have.property('message','Delete patient succeed.');
                    done();
                }
            );
        });
    });


});