
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const hobbies = require('../util/hobbies');


const userSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    age: Number,
    description: String,
    hobbies: [
        {
            type: String,
            enum: hobbies
        }
    ],
    location: {
        geo: {
            type: 'Point',
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

module.exports = models.User || model("User", userSchema);

