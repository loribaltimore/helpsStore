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
    preferences: {
        range: Number,
        gender: {
            type: String,
            enum: ['male', 'female', 'non-binary', 'all']
        },
        age: Number
    },
    connections: {
        pending: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        rejected: [String],
        rejectedBy: [String],
        matched: [String],
        liked: [String],
        reciprocated: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Connection'
            }
        ],
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    membershipType: {
        type: String,
        enum: ['basic', 'pro'],
        default: 'basic'
    },
    reviews: [
        {
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
    ],
    interestAndPass: {
        interested: {
            total: Number,
            count: Number,
        },
        pass: {
            total: Number,
        }
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



userSchema.static('sendMessage', async (message) => {
    await database();
    const User = models.User || model('User', userSchema);


});

userSchema.static('interestAndPass', async (currentUserId, connectionId, isInterested) => {
    await database();
    const User = models.User || model('User', userSchema);
    const currentUser = await User.findById(currentUserId);
    const connection = await User.findById(connectionId);
    
    connection.interestAndPass[isInterested].count += 1;
    isInterested === 'interested' ? connection.interestAndPass.interested.total += currentUser.rating.avg : null;
});

userSchema.virtual('dontQueue', async (currentUserId) => { 
    await database();
    const User = models.User || model('User', userSchema);
    const currentUser = await User.findById(currentUserId);
    return [...currentUser.connections.pending, ...currentUser.connections.rejected, ...currentUser.connections.matched];
});

module.exports = models.User || model("User", userSchema);
