var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var patientRecordSchema = new Schema({
    appointment: {type: Schema.Types.ObjectId, ref: 'Appointment'},
    weight: String,
    height: String,
    temperature: String,
    heartRate: String,
    systolic: String,
    diastolic: String
},{
    timestamps: true,
    collection: 'patientRecords'
});

patientRecordSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

module.exports = PatientRecord;