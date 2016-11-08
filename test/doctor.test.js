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
        it("it should GET all doctors", function(done){
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
                    res.body.data.should.be.a('array');
                    console.log(res.body.data);
                    done();
                }
            )
        });
    });
});