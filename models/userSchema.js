let mongoose = require('mongoose');
let { Schema, model, models } = mongoose;
const database = require('./database');

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        firstName: {
            type: String,
            required: true,
            min: 1,
            max: 10
        },
        lastName: {
            type: String,
            required: true,
            min: 1,
            max: 10
        },
        age: {
            type: Number,
            required: true,
            min: 18
        },
    },
    address: {
        shipping: {
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
        billing: {
            sameAsShipping: {
                type: Boolean,
                required: true,
                default: false
            },
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
    },
    admin: {
        permissions: {
            type: Array,
            default: ['none']
        }
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    membership: {
        tier: {
            type: String,
            required: true,
            enum: ['bottom', 'low', 'middle', 'top'],
            default: 'bottom'
        },
        unlockedColors: {
            type: Array,
            default: ['#ff5757', '#5ce1e6']
        }, 
        totalDonations: {
            type: Number,
            required: true,
            default: 0
        }
    },
    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'purchase'
        }
    ],
    charities: {
        interests: {
            type: Map,
            of: Object,
            default: new Map()
        },
        liked: {
            orgs: {
                type: Array,
                default: [
                        {
                            description: "the helps Pool will take all user donations and make on large donation to an organization voted on by each user.",
                            name: "helps Pool",
                            profileUrl: 'https://www.every.org/lilbubsbigfund',
                            logoUrl: 'https://res.cloudinary.com/demgmfow6/image/upload/c_lfill,w_25,h_25,dpr_2/c_crop,ar_25:25/q_auto,f_auto,fl_progressive/v1671644999/helps/vggmorzngbqcniaejrrt.jpg',
                            coverImageUrl: 'https://res.cloudinary.com/demgmfow6/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1671562550/helps/ftbgr37eg2nqtv0ydbej.jpg',
                            matchedTerms: [],
                            slug: 'helpspool',
                            location: 'BELLEVUE, WA',
                            tags: [],
                            sort: 0,
                          }
                ]
            },
            tags: {
                type: Map,
                of: Number,
                default: new Map()
            }
        },
        donations: {
            type: Array,
            default: []
        },
        donatedTo: {
            type: Map,
            of: Object,
            default: new Map()
        },
        items: [
            {
                type: Object
            }
        ],
    }
});



//User Virtuals -----------
userSchema.virtual('shipping').get(function () {
    Object.keys(this.address.shipping).map(function (element, index) {
        return Object.keys(this.address.shipping)[element];
    }).join('')
}, this);
userSchema.virtual('billing').get(function () {
    Object.keys(this.address.billing).map(function (element, index) {
        return Object.keys(this.address.shipping)[element];
    }).join('')
}, this);
userSchema.virtual('name').get(function () {
    return this.bio.firstName + ' ' + this.bio.lastName;
}, this);
userSchema.virtual('sortedTags').get(function () {
    let allTags = [];
    
        this.charities.liked.tags.forEach(function (value, key) {
            allTags.push([key, value]);
        });
        allTags.sort(function (a, b) {
            return b[1] - a[1]
        });
        return allTags;
   
});
userSchema.virtual('sortedInterests').get(function () {
    let interestsArr = [];
    this.charities.interests.forEach(function (value, key) {
        interestsArr.push([key, value]);
    });

    return interestsArr.sort(function (a, b) {
        return b[1].score - a[1].score;
    });
})

//User Methods ------------------
userSchema.method('changeTier').get(async () => {
    let { tier } = this.membership;
    switch (tier) {
        case 'bottom':
             this.membership.tier = 'low';
            this.membership.unlockedColors.push('pink');
            this.membership.unlockedColors.push('tan');
            break;
        case 'low':
            this.membership.tier = 'middle';
            this.membership.unlockedColors.push('blue')
            this.membership.unlockedColors.push('orange')
            break;
        case 'middle':
            this.membership.tier = 'top';
            this.membership.unlockedColors.push('black')
            this.membership.unlockedColors.push('white')
            break;
    };
    await this.save();
}, this);

userSchema.method('addDonation', async (val, id) => {
    let currentUser = await User.findById(id);
    if (currentUser.membership.tier !== 'top') {
        if (((currentUser.membership.totalDonations + val)) * 5 >= 250) {
        currentUser.membership.tier = 'top'
        currentUser.membership.unlockedColors.push('black');
        currentUser.membership.unlockedColors.push('white');
    } else if (((currentUser.membership.totalDonations + val) * 5) >= 150 ) {
        currentUser.membership.tier = 'middle';
        currentUser.membership.unlockedColors.push('blue');
        currentUser.membership.unlockedColors.push('orange');
    } else if (((currentUser.membership.totalDonations + val) * 5) >= 50) {
        currentUser.membership.tier = 'low';
        currentUser.membership.unlockedColors.push('pink');
        currentUser.membership.unlockedColors.push('tan');
    };
    };
    currentUser.membership.totalDonations += val;
    await currentUser.save();
    console.log(currentUser.membership.tier);
});


//Edit Profile Methods
userSchema.method('changePhone').get(async (val) => {
    this.contact.phone = val;
    await this.save();
}, this);
userSchema.method('changeEmail').get(async (val) => {
    this.contact.email = val;
    await this.save();
}, this);
userSchema.method('changeFirstName').get(async (val) => {
    this.bio.firstName = val;
    await this.save();
}, this);
userSchema.method('changeLastName').get(async (val) => {
        await database();
    const User = models.User || model("User", userSchema);

    this.bio.lastName = val;
    await this.save();
}, this);

userSchema.method('changeShipping').get(async (arr) => {
        await database();
    const User = models.User || model("User", userSchema);

    let address = Object.keys(this.address.shipping);
    for (let i = 0; i < arr.length -1; i++){
        this.address.shipping[address[i]] = arr[i];
    };
    await this.save
}, this);

userSchema.method('changeBilling').get(async (arr = [], sameAsShipping) => {
        await database();
    const User = models.User || model("User", userSchema);

    if (sameAsShipping === true) {
        this.address.billing = this.address.shipping
    } else {
        let address = Object.keys(this.address.billing);
        for (let i = 0; i < arr.length -1; i++){
            this.address.billing[address[i]] = arr[i];
        };
    };
    await this.save();
}, this);

userSchema.method('unlikeCharity', async (id, org, cause) => {
         await database();
    const User = models.User || model("User", userSchema);
    let currentUser = await User.findById(id);
    currentUser.charities.liked.orgs = currentUser.charities.liked.orgs.filter(x => x.name !== org);
    currentUser.charities.interests.get(cause).score -= 1;
    let currentTags = currentUser.charities.interests.get(cause).tags;
    Object.keys(currentTags).forEach(function (element, index) {
        currentTags[element].score -= 1;
    });
    await currentUser.save();
    return currentUser.charities.liked.orgs.map(x => x.name)
})

userSchema.method('likeCharity', async (id, org, cause) => {
    await database();
    const User = models.User || model("User", userSchema);
    let currentUser = await User.findById(id);
    console.log(org, 'ORG IS');
    currentUser.charities.liked.orgs = [...currentUser.charities.liked.orgs, org];
    let allTags = {};
    org.tags.forEach(function (element, index) {
        allTags[element] = 1;
    });
    if (currentUser.charities.interests.get(cause) === undefined) {
        currentUser.charities.interests.set(cause, { score: 1, tags: allTags })
        console.log('is new cause');
        // return currentUser.charities.interests;
    } else {
        let updatedScore = currentUser.charities.interests.get(cause).score += 1;
        let updatedTags = currentUser.charities.interests.get(cause).tags;
        Object.keys(allTags).forEach(function (element, index) {
            updatedTags[element] = updatedTags[element] + 1 || 1;
        });
        currentUser.charities.interests.set(cause, { score: updatedScore, tags: updatedTags })
    };
            // return currentUser.charities.interests;
        await currentUser.save();

});

module.exports = models.User || model("User", userSchema);



running through full UX.Want to complete purchase -> have to build api / checkout to do that first. 
Then want to make sure queue logs works and stuff





