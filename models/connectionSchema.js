const { Schema, model, models } = require('mongoose');
const database = require('./database');

const connectionSchema = new Schema({
    connection1: {
        name: String,
        id: String,
        photo: [String]
    },
    connection2: {
        name: String,
        id: String,
        photo: [String]
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
    compatibility: {
        openness: Number,
        conscientiousness: Number,
        extraversion: Number,
        agreeableness: Number,
        neuroticism: Number
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


connectionSchema.method('calculateCompatibility', async function (connectionId, currentUserPersonality, connectedUserPersonality) { 
const Connection = models.connection || model('Connection', connectionSchema);
    const currentConnection = await Connection.findById(connectionId);
    const compatibilityCalculation = {};
    Object.keys(currentUserPersonality).forEach((trait, index) => {
        compatibilityCalculation[trait] = 10 - Math.abs(Math.round(currentUserPersonality[trait] - connectedUserPersonality[trait]))
    });
    currentConnection.compatibility = compatibilityCalculation;
    await currentConnection.save();
})
module.exports = models.Connection || model('Connection', connectionSchema);