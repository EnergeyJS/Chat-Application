// require third prarty library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// messanger schema
const messangerSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    recever: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    messagetext: {
        type: String,
        required: true
    },

},
    { timestamps: true });
module.exports = mongoose.model('message', messangerSchema);