var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    doctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
    day: String,
    time: String
},{
    timestamps: true,
    collection: 'schedules'
});

scheduleSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;