// require third prarty library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('user', userSchema);