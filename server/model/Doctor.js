var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
    HN: String,
    personalID: String,
    preName: String,
    name: String,
    surname: String,
    clinic: {type: ObjectId, ref: 'Clinic'}
},{
    timestamps: true,
    collection: 'doctors'
});

doctorSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;