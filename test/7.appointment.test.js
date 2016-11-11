process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var staffToken = "";
describe("Appointment", function(){
    before(function(done){
        chai.request(server)
        .post('/auth/login')
        .send({
            username: "staff1",
            password: "staff1"
        })
        .end(
            function(err, res){
                staffToken = res.body.data.token;
                done();
            }
        );
    });
    describe("/DELETE appointment by id", function(){
        it("it should DELETE appointment by using staff role", function(done){
            let Appointment = require('../server/model/Appointment');
            Appointment.findOne()
            .then(function(appointment){
                chai.request(server)
                .delete('/api/v1/appointments/'+appointment._id)
                .set("x-access-token",staffToken)
                .end(
                    function(err, res){
                        res.should.have.status(200);
                        res.should.be.json; 
                        res.body.should.be.a('object');
                        res.body.should.have.property('success',true);
                        res.body.should.have.property('clientMessage','Delete appointment succeed.');
                        done();
                    }
                );
            });
        });
    });
});