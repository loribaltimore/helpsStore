const database = require('./database');
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const hobbies = require('../util/hobbies');


const userSchema = new Schema({
    username: String,
    name: String,
    age: Number,
    description: String,
    email: String,
    image: String,
    emailVerified: Boolean,
    rating: {
        total: {
            type: Number,
            default: 5
        },
        count: {
            type: Number,
            default:1
        },
        avg: {
            type: Number,
            default: 5
        }
    },
    photos: [String],
    genderId: {
        type: String,
        enum: ['male', 'female', 'non-binary' ,'other']
    },
    hobbies: [
        {
            type: String,
            enum: hobbies
        }
    ],
    location: {
        geo: {
            type: {
                type: String,
                default: 'Point'
            } ,
            coordinates: [Number]
        }
    },
    connections: {
        type: Map,
        of: Object,
        default: new Map()
    },
    memberSince: {
        type: Date,
        default: Date.now
    }
});

userSchema.method('rate', async function (rating, userId) {
    console.log("RATER IS WORKING")
    const User = models.User || model("User", userSchema);
    const currentUser = await User.findById(userId);
    currentUser.rating.total += rating;
    currentUser.rating.count += 1;
    currentUser.rating.avg = currentUser.rating.total / currentUser.rating.count;
    await currentUser.save();
});

userSchema.static('icebreaker', async function (activeUserId, answers, connectionId) {
    console.log("ICEBREAKER IS WORKING");
    await database();
    const User = models.User || model('User', userSchema);
    const currentUser = await User.findById(activeUserId);
    const connection = await User.findById(connectionId);
   
    const connectionConnections = Object.fromEntries(connection.connections);
    const theirAnswers = connectionConnections[activeUserId].trivia.me !== undefined;

    currentUser.connections.set(connectionId, { 
        id: connectionId,
        status: 'reciprocated',
        conversation: [],
        trivia: {
            me: answers,
            them: !theirAnswers ? false : connectionConnections[activeUserId].trivia.me
        },
        jokes: {}
    });
    connection.connections.set(activeUserId, {
        id: activeUserId,
        status: 'reciprocated',
        conversation: [],
            trivia: {
                me: connectionConnections[activeUserId].trivia.me || false,
                them: answers,
            }
        });

    await connection.save();
    await currentUser.save();
})

module.exports = models.User || model("User", userSchema);
