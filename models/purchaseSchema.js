let mongoose = require('mongoose');
let { Schema, model } = mongoose;
let { userSchema } = mongoose;
// let User = model('user', userSchema);

let purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            name: String,
            qty: Number,
            size: {
                type: String,
                enum: ['s', 'm', 'l', 'xl']
            },
        }
    ],
    address: {
        num: {
            type: String
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String,
            enum: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        country: {
            type: String,
            default: 'USA'
        }
    },
    orgs: [
        {
            type: String
        }
    ]
});

let Purchase = model('purchase', purchaseSchema);

module.exports = Purchase;