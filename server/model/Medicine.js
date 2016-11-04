var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var medicineSchema = new Schema({
    name: String,
    description: String
},{
    timestamps: true,
    collection: 'medicines'
});

medicineSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;