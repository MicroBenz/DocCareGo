var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var patientSchema = new Schema({
    HN: String,
    personalID: String,
    preName: String,
    name: String,
    surname: String,
    houseNumber: String,
    road: String,
    soi: String,
    subdistrict: String,
    district: String,
    province: String,
    zipCode: String,
    country: String,
    tel: String,
    noMedicines: [String]
},{
    timestamps: true,
    collection: 'patients'
});

patientSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;