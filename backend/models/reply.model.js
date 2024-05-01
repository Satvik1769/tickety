const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const replySchema = new Schema({
    userName:{
        type: String,
    },
    reply :{
        type: String
    },
    replies:[{
        type: Schema.Types.ObjectId,
        ref: 'Reply',
        default: [],
        required: false
    }]

})

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;