var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var diseaseSchema = new Schema({
    name: String,
    icd10: String,
    snowmed: String,
    drg: String,
    description: String
},{
    timestamps: true,
    collection: 'diseases'
});

diseaseSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;