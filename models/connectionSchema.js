const { Schema, model, models } = require('mongoose');
const database = require('./database');

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
            connection: String,
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
            },
            bothShownDate: Date
        },
        review: {
            connection1: {
            rating: Number,
            text: String,
            reviewerId: String,
            image: String,
            from: String,
            date: {
                type: Date,
            },
            connectionId: String
        },
            connection2: {
            rating: Number,
            text: String,
            reviewerId: String,
            image: String,
            from: String,
            date: {
                type: Date,
                default: Date.now
            },
            connectionId: String
        }
        }
    },
});


connectionSchema.static('icebreaker', async function (activeUser, answers, connectionId) {
    console.log("ICEBREAKER IS WORKING");
    await database();
    const Connection = models.Connection || model('Connection', connectionSchema);
    const connection = await Connection.findById(connectionId);
    connection.trivia[activeUser] = answers;
    let isCompatibility;
    if (activeUser === 'connection1') {
        isCompatibility = connection.trivia.connection2 !== undefined;
    } else {
        isCompatibility = connection.trivia.connection1 !== undefined;
    }
    return isCompatibility;
});

module.exports =  models.Connection || model('Connection', connectionSchema);