var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var nurseSchema = new Schema({
    HN: String,
    personalID: String,
    preName: String,
    name: String,
    surname: String
},{
    timestamps: true,
    collection: 'nurses'
});

nurseSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;