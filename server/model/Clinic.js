var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var clinicSchema = new Schema({
    name: String,
    description: String
},{
    timestamps: true,
    collection: 'clinics'
});

clinicSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;