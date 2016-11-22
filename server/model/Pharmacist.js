var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var pharmacistSchema = new Schema({
    HN: String,
    personalID: String,
    preName: String,
    name: String,
    surname: String
},{
    timestamps: true,
    collection: 'pharmacists'
});

pharmacistSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;