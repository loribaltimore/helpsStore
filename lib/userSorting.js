const User = require('../models/userSchema');
const calculateDistance = require('../util/calculateDistance');
const database = require('../models/database')

const userSorting = async function (preferredGender, age, range, coords, userId) {
    await database();
    let possibleMatches;
    possibleMatches = await User.find({
        genderId: { $eq: preferredGender },
        age: { $lte: age },
        "connections.rejectedBy": { $ne: userId },
        "connections.matched": { $ne: userId },
        "connections.pending": { $ne: userId },
    }).then(data => { return data }).catch(err => console.log(err));
    let matchesByDistance;
   matchesByDistance = possibleMatches.filter(match => {
        const distance = calculateDistance(coords, match.location.geo.coordinates);
        if (distance <= range) {
            return match
        };
    });
    if (matchesByDistance.length < 5) {
       possibleMatches = await userSorting(preferredGender, age + 1, range + 5, coords, userId);
     matchesByDistance = [...matchesByDistance, ...possibleMatches.filter(match => {
        const distance = calculateDistance(coords, match.location.geo.coordinates);
        if (distance <= range) {
            return match
        };
    })]
        }
    return matchesByDistance
};


module.exports = userSorting;