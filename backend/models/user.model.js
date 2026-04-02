const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 //username must be 3 chars long
    },
}, {
    timestamps:true,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);