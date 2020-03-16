// require third prarty library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// messanger schema
const friendSchema = new Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    statusData: {
        type: Boolean,
        default: false
    }

},
    { timestamps: true });
module.exports = mongoose.model('friend', friendSchema);