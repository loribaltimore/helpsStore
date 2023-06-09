
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
})

module.exports = models.User || model("User", userSchema);

