var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var diagnosisResultSchema = new Schema({
    appointment: {type: ObjectId, ref: 'Appointment'},
    description: String,
    diseases: [{type: ObjectId, ref: 'disease'}],
    medicines: [{type: ObjectId, ref: 'Medicine'}],
    numberOfMedicines: [Number]
},{
    timestamps: true,
    collection: 'diagnosisResults'
});

diagnosisResultSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var DiagnosisResult = mongoose.model('DiagnosisResult', diagnosisResultSchema);

module.exports = DiagnosisResult;H