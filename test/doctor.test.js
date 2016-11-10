process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Doctor = require('../server/model/Doctor');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

describe("Doctors", function(){
    describe("/GET doctors", function(){
        it("it should GET all doctors by using admin role", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjMmIzMGMxNjFhYjBmMGU5YTIiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYxNFoiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYxNFoiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkb2NjYXJlLmdvLnRoIiwiX192IjowLCJkZWxldGVkIjpmYWxzZSwibmFtZSI6IuC4nOC4ueC5ieC4lOC4ueC5geC4peC4o-C4sOC4muC4miIsImlhdCI6MTQ3ODU4OTY4MiwiZXhwIjoxNDc4Njc2MDgyfQ.gs2ZX7leY8GcyHDV0mc1aWNOOUns-1NppoDNpEo4DcE")
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
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjOGIzMGMxNjFhYjBmMGU5YjciLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJ1c2VybmFtZSI6InN0YWZmMSIsInJvbGUiOiJzdGFmZiIsImVtYWlsIjoic3RhZmYxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIMSIsImlhdCI6MTQ3ODU5MDg3MiwiZXhwIjoxNDc4Njc3MjcyfQ.H44nwNQ9f8dK6ji_6RiPVDGwvBjFmV7UtFL1iDbyph8")
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
            .get('/api/v1/doctors')
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODIxODM1MmExMTczYTE1MDQzZjk0YjkiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA4VDA3OjQ4OjQ3LjQ0M1oiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA4VDA3OjQ4OjQ3LjQ0M1oiLCJ1c2VybmFtZSI6InBhdGllbnQxIiwicm9sZSI6InBhdGllbnQiLCJlbWFpbCI6InBhdGllbnQxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4Lic4Li54LmJ4Lib4LmI4Lin4LiiMSIsImlhdCI6MTQ3ODU5NDE0MiwiZXhwIjoxNDc4NjgwNTQyfQ.Qxmoz2mHT-Uqx_XDPL_PovXcWUSosU_BDXmELdPS7yU")
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

    describe("/GET/:HN doctors", function(){
        it("it should GET doctors by HN using admin role", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjMmIzMGMxNjFhYjBmMGU5YTIiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYxNFoiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYxNFoiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkb2NjYXJlLmdvLnRoIiwiX192IjowLCJkZWxldGVkIjpmYWxzZSwibmFtZSI6IuC4nOC4ueC5ieC4lOC4ueC5geC4peC4o-C4sOC4muC4miIsImlhdCI6MTQ3ODU4OTY4MiwiZXhwIjoxNDc4Njc2MDgyfQ.gs2ZX7leY8GcyHDV0mc1aWNOOUns-1NppoDNpEo4DcE")
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

        it("it should GET all doctors by HN using staff role", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjOGIzMGMxNjFhYjBmMGU5YjciLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJ1c2VybmFtZSI6InN0YWZmMSIsInJvbGUiOiJzdGFmZiIsImVtYWlsIjoic3RhZmYxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIMSIsImlhdCI6MTQ3ODU5MDg3MiwiZXhwIjoxNDc4Njc3MjcyfQ.H44nwNQ9f8dK6ji_6RiPVDGwvBjFmV7UtFL1iDbyph8")
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
        
        it("Using patient role to GET/:HN, so it should show error", function(done){
            chai.request(server)
            .get('/api/v1/doctors')
            .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODIxODM1MmExMTczYTE1MDQzZjk0YjkiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA4VDA3OjQ4OjQ3LjQ0M1oiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA4VDA3OjQ4OjQ3LjQ0M1oiLCJ1c2VybmFtZSI6InBhdGllbnQxIiwicm9sZSI6InBhdGllbnQiLCJlbWFpbCI6InBhdGllbnQxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4Lic4Li54LmJ4Lib4LmI4Lin4LiiMSIsImlhdCI6MTQ3ODU5NDE0MiwiZXhwIjoxNDc4NjgwNTQyfQ.Qxmoz2mHT-Uqx_XDPL_PovXcWUSosU_BDXmELdPS7yU")
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
});