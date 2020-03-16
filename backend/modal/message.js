// require third prarty library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// messanger schema
const messangerSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    recever: {
        type: String,
        required: true,
    },
    messagetext: {
        type: String,
        required: true
    },

},
    { timestamps: true });
module.exports = mongoose.model('message', messangerSchema);