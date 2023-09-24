let mongoose = require('mongoose');
let { Schema, model, models } = mongoose;

let donationSchema = new Schema([{
    user: {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    orgs: [
        {
       name: {
            type: String,
           required: true
        },
        ein: {
            type: String,
        },
        slug: {
            type: String,
        },
        img: {
            type: String
            },
        coverImg: {
            type: String
            },
            coinTotal: {
            type: Number
            },
            description: String,
            logo: String,
    }
    ],
    transaction: {
        amount: {
            total: {
                type: Number,
                required: true
            },
            final: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                default: 'USD'
            }, 
        },
        items: {
            type: Array,
            default: []
        },
        shipTo: {
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
        date: {
            type: Date,
            default: new Date().toISOString()
        },
        stripe_id: {
            type: String,
        },
    },
    fulfillment: {
        donation: {
            fulfilled: {
                type: Boolean,
                default: false
            },
            receiptNumber: {
                type: String
            }
        },
        order: {
            fulfilled: {
                type: Boolean,
                default: false
            },
            allReceipts: [
                {
                    type: String
                }
            ],
            allOrderedFrom: [
                {
                    type: String
                }
            ],
            fulfillDate: {
                   type: Date,
            },
            shipped: {
                type: Date
            },
            tracking: {
                type: String
            }
        }
    },
    donation_id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    
    sort: {
        type: Number,
        default: 0
    },
    
}]);

module.exports = models.Donation || model('Donation', donationSchema);