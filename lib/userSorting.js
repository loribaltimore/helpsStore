const User = require('../models/userSchema');
const calculateDistance = require('../util/calculateDistance');
const database = require('../models/database')

const userSorting = async function (preferredGender, age, range, coords, currentUserId, looksRating, isPro, desperate, getRandom) {
    await database();
    let possibleMatches;
    let matchesByDistance;
    console.log('getRandom', getRandom);
    if (!getRandom) {
        possibleMatches = await User.find({
        genderId: { $eq: preferredGender },
        age: { $lte: age },
        "rating.looks.avg": {$gte: looksRating},
        "connections.rejectedBy": { $ne: desperate || currentUserId },
        "connections.matched": { $ne: currentUserId },
        "connections.pending": { $ne: currentUserId },
        "rating.date.avg": {$gte: isPro },
        }).then(data => { return data }).catch(err => console.log(err));
    matchesByDistance = desperate ? possibleMatches :  possibleMatches.filter(match => {
        const distance = calculateDistance(coords, match.location.geo.coordinates);
        if (distance <= range) {
            return match
        };
    });
    } else {
        const rand = Math.floor(Math.random() * 100);
        matchesByDistance = await User.find({}).then(data => {return data.slice(rand, rand + 20)}).catch(err => console.log(err))
    }
    return matchesByDistance;
}; 
 
const sortFunction = async function (currentUserId) {
    const currentUser = await User.findById(currentUserId);
    let desperate = false;
    let getRandom = false;
    let { age, gender, range } = currentUser.preferences;
    const { coordinates } = currentUser.location.geo;
    let { count, total } = currentUser.rating.looks;
    let isPro = currentUser.membershipType === 'pro' ? 7 : 1;
    let possibleMatches = [];
    let ratingCounter = 0;
    let aggregatedAge = age;
    let aggregatedRange = range;
    let aggregatedLooksRating = Math.floor(total/count);
    let cont = true;
    while (cont) {
        await userSorting(gender, aggregatedAge, aggregatedRange, coordinates, currentUserId, aggregatedLooksRating, isPro, desperate, getRandom)
            .then(data => {
                possibleMatches.push(...data);
                if (possibleMatches.length >= 20) { 
                    cont = false;
                }
            }).catch(err => console.log(err))
        aggregatedAge++;
        aggregatedRange += 2;
        ratingCounter++;
        if (ratingCounter == 20) {
            let contingent = 0;
            if (aggregatedLooksRating > 0) {
                aggregatedLooksRating--;
                if (aggregatedLooksRating < 2) {
                    desperate = true;
                }
            } else {contingent++}
            if (isPro > 0) {
                isPro--;
            } else { contingent++ };
            if (contingent === 2) { 
                getRandom = true;
                cont = false
            }
            ratingCounter = 0;
            aggregatedAge = age;
            aggregatedRange = range;
        };
    };
    return possibleMatches
};


module.exports = {userSorting, sortFunction};

