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
            .end(
                function(err, res){
                    res.should.have.status(200);
                    done();
                }
            )
        });
    });
});