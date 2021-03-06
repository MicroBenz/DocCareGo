var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var workdaySchema = new Schema({
    doctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
    date: Date,
    time: String
},{
    timestamps: true,
    collection: 'workdays'
});

workdaySchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Workday = mongoose.model('Workday', workdaySchema);

module.exports = Workday;