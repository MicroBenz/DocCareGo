var mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true },
    role: String,
    email: String,
    password: String,
},{
    timestamps: true,
    collection: 'users'
});

userSchema.plugin(mongoose_delete, {
    deletedBy: true,
    deletedAt: true,
    overrideMethods: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;