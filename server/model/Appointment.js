var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    description: String,
    patient: {type: ObjectId, ref: 'Patient'},
    doctor: {type: ObjectId, ref: 'Doctor'},
    workday: {type: ObjectId, ref: 'Workday'}
},{
    timestamps: true,
    collection: 'appointments'
});

appointmentSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;