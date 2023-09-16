const database = require('./database');
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const hobbies = require('../util/hobbies');
const calculateWeek = require('../util/calculateWeek');

const userSchema = new Schema({
    username: String,
    name: String,
    age: Number,
    description: String,
    email: String,
    image: String,
    emailVerified: Boolean,
    sign: String,
    personality: {
        openness: Number,
        conscientiousness: Number,
        extraversion: Number,
        agreeableness: Number,
        neuroticism: Number,
        },
    rating: {
        looks: {
            total: {
                type: Number,
                default: 5
            },
            count: {
                type: Number,
                default: 1
            },
            avg: {
                type: Number,
                default: 5
            },
            metricsByAge: {
                type: Map,
                of: Object,
                default: new Map(),
            },
            
        },
        date: {
            total: {
                type: Number,
                default: 5
            },
            count: {
                type: Number,
                default: 1
            },
            avg: {
                type: Number,
                default: 5
            },
        },
        weekly: {
            currentWeek: {
                looks: {
                    rating: {
                        type: Number,
                        default: 5
                    },
                    trend: {
                        type: String,
                        default: 'none'
                    },
                },
                date: {
                    rating: {
                        type: Number,
                        default: 5
                    },
                    trend: {
                        type: String,
                        default: 'none'
                    }
                },
            },
            lastWeek: {
                looks: {
                    rating: {
                        type: Number,
                        default: 5
                    },
                    trend: {
                        type: String,
                        default: 'none'
                    },
                },
                date: {
                    rating:{
                        type: Number,
                        default: 5
                    },
                    trend: {
                        type: String,
                        default: 'none'
                    }
                },
            }
        },
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
        weekly: {
            currentWeek: {
                likedPercentage: {
                    type: Number,
                    default: 0
            },
            trend: {
                type: String,
                default: 'none'
            }
            },
            lastWeek: {
                likedPercentage: {
                type: Number
            },
            trend: {
                type: String,
                default: 'none'
            }
            }
        }
    },
    membership: {
 memberSince: {
        type: Date,
        default: Date.now
    },
    membershipType: {
        type: String,
        enum: ['basic', 'pro'],
        default: 'basic'
        },
        week: {
            type: Number,
            default: calculateWeek()
    }
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
            total: {
                type: Number,
                default: 0
            },
            count: {
                type: Number,
                default: 0
            },
        },
        pass: {
            count: {
                type: Number,
                default: 0
            },
        },
        byTotal: [
            {
                interested: {
                    type: Number,
                    default: 0
                },
                pass: {
                    type: Number,
                    default: 0
                },
                matched: {
                    type: Number,
                    default: 0
                },
                dated: {
                    type: Number,
                    default: 0
                }
            }
        ],
    },
    notifications: {
        chat: [
            {
                text: String,
                from: String,
            }
        ],
        bank: [
            {
                from: String,
            }
        ],
        reviews: [
            {
                from: String,
                text: String,
                rating: Number,
            }
        ]
    }
});

userSchema.method('rate', async function (rating, userId, relativeUserRating, type) {
    const User = models.User || model("User", userSchema);
    const currentUser = await User.findById(userId);
    console.log(rating * Math.abs(rating - relativeUserRating));
    currentUser.rating[type].total += rating;
    currentUser.rating[type].count += 1;
    currentUser.rating[type].avg = Math.round(currentUser.rating[type].total / currentUser.rating[type].count);
    await currentUser.save();
});



userSchema.static('sendMessage', async (message) => {
    await database();
    const User = models.User || model('User', userSchema);


});

userSchema.static('interestAndPass', async (currentUserId, isInterested) => {
    await database();
    const User = models.User || model('User', userSchema);
    const currentUser = await User.findById(currentUserId);
    console.log(currentUserId, 'IS HERE IS HERE');
    const totalInteractions = currentUser.interestAndPass.interested.count + currentUser.interestAndPass.pass.count;
    const increment = totalInteractions <= 50 ? 1: Math.floor(totalInteractions / 50);
    if (!currentUser.interestAndPass.byTotal[increment]) {
            currentUser.interestAndPass.byTotal.push({ interested: 0, pass: 0, matched: 0, dated: 0 });
    };
    currentUser.interestAndPass.byTotal[increment][isInterested] += 1;
    isInterested !== 'matched' ?
        currentUser.interestAndPass[isInterested].count += 1 : null;
    
    await currentUser.save();
});

userSchema.virtual('dontQueue', async (currentUserId) => { 
    await database();
    const User = models.User || model('User', userSchema);
    const currentUser = await User.findById(currentUserId);
    return [...currentUser.connections.pending, ...currentUser.connections.rejected, ...currentUser.connections.matched];
});

module.exports = models.User || model("User", userSchema);
