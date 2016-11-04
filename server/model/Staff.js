var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var staffSchema = new Schema({
    id: String,
    personalID: String,
    preName: String,
    name: String,
    surname: String
},{
    timestamps: true,
    collection: 'staffs'
});

staffSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;