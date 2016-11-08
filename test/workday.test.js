process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Workday = require('../server/model/Workday');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

describe("Workdays", function(){
    describe("/GET workdays by doctor HN", function(){
        it("it should GET workday by using staff role", function(done){
            let Doctor = require('../server/model/Doctor');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                chai.request(server)
                .get('/api/v1/workdays/'+doctor._id)
                .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjOGIzMGMxNjFhYjBmMGU5YjciLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJ1c2VybmFtZSI6InN0YWZmMSIsInJvbGUiOiJzdGFmZiIsImVtYWlsIjoic3RhZmYxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIMSIsImlhdCI6MTQ3ODU5MDg3MiwiZXhwIjoxNDc4Njc3MjcyfQ.H44nwNQ9f8dK6ji_6RiPVDGwvBjFmV7UtFL1iDbyph8")
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('data');
                        done();
                    }
                );
            });
        });
    });
    describe("/POST create workday", function(){
        it("it should POST create workday", function(done){
            let Doctor = require('../server/model/Doctor');
            Doctor.findOne({HN:'doctor1'})
            .then(function(doctor){
                let data = {
                    doctor: doctor,
                    day: 'Monday',
                    time: 'AM'
                }
                chai.request(server)
                .post('/api/v1/workdays')
                .set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkN2RjOGIzMGMxNjFhYjBmMGU5YjciLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTA1VDA2OjM2OjAwLjYzMloiLCJ1c2VybmFtZSI6InN0YWZmMSIsInJvbGUiOiJzdGFmZiIsImVtYWlsIjoic3RhZmYxQGRvY2NhcmUuZ28udGgiLCJfX3YiOjAsImRlbGV0ZWQiOmZhbHNlLCJuYW1lIjoi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIMSIsImlhdCI6MTQ3ODU5MDg3MiwiZXhwIjoxNDc4Njc3MjcyfQ.H44nwNQ9f8dK6ji_6RiPVDGwvBjFmV7UtFL1iDbyph8")
                .send(data)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Create workday succeed');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('array');
                        res.body.data.should.have.length(100);
                        done();
                    }
                );
            });
        });
    });
});