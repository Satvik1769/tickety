const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        // Remove unique:true if 'type' is not intended to be unique
    },
    description: {
        type: String
    },
    subject: {
        type: String
    },
    status: {
        type: String,
        default: 'open'
    },
    date: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        default: 'low'
    },
    reply: [{
        type: Schema.Types.ObjectId,
        ref: 'Reply',
        default: [],
        required: false
    }]
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
