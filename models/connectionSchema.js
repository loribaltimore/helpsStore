const { Schema, model, models } = require('mongoose');

const connectionSchema = new Schema({
    connection1: {
        name: String,
        id: String
    },
    connection2: {
        name: String,
        id: String
    },
    conversation: [
        {
            text: String,
            date: {
                type: Date,
                default: Date.now
            },
            sender: String,
            receiver: String,
            read: {
                type: Boolean,
                default: false
            },
            delivered: {
                type: Boolean,
                default: true
            },
            liked: {
                type: Boolean,
                default: false
            }
        },
    ],
    trivia: {
        connection1: [
            {
                question: String,
                answers: [String],
                chosen: String
            },
        ],
        connection2: [
            {
                question: String,
                answers: [String],
                chosen: String
            },
        ],
    },
    date: {
        invite: {
            sentBy: String,
            sentTo: String,
            date: Date,
            accepted: {
                type: Boolean,
                default: false
            }
        },
        shown: {
            connection1: Date,
            connection2: Date,
            bothShown: {
                type: Boolean,
                default: false
            }
        },
        review: {
            connection1: {
                rating: Number,
                text: String,
            },
            connection2: {
                rating: Number,
                text: String
            }
        }
    },
});

module.exports =  models.Connection || model('Connection', connectionSchema);