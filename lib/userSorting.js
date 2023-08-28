const User = require('../models/userSchema');
const calculateDistance = require('../util/calculateDistance');
const database = require('../models/database')

const userSorting = async function (preferredGender, age, range, coords, currentUserId) {
    console.log("IS SORTING");
    await database();
    let possibleMatches;
    possibleMatches = await User.find({
        genderId: { $eq: preferredGender },
        age: { $lte: age },
        "connections.rejectedBy": { $ne: currentUserId },
        "connections.matched": { $ne: currentUserId },
        "connections.pending": { $ne: currentUserId },
    }).then(data => { return data }).catch(err => console.log(err));
    let matchesByDistance;
    matchesByDistance = possibleMatches.filter(match => {
        const distance = calculateDistance(coords, match.location.geo.coordinates);
        if (distance <= range) {
            return match
        };
    });

    

    return matchesByDistance;
}; 
 
const sortFunction = async function (currentUserId) {
    const currentUser = await User.findById(currentUserId);
    let { age, gender, range } = currentUser.preferences;
    const {coordinates} = currentUser.location.geo;
    const possibleMatches = [];
    while (possibleMatches.length < 20) {
        await userSorting(gender, age, range, coordinates, currentUserId)
            .then(data => { console.log(data); possibleMatches.push(...data)}).catch(err => console.log(err))
        console.log(possibleMatches.length);
    console.log(age);
    console.log(range);
    age++;
    range += 5;
    };
    return possibleMatches
};


module.exports = {userSorting, sortFunction};


// FIX SORTING ALGORITHM TO BE BE MORE EFFICIENT
// FIX IT SO THAT IS SLOWLY INCREASES SCOPE OF FILTER BASED ON WHETHER OR NOT THERE ARE ENOUGH MATCHES
// CALL USER / MINGLES FROM ALLPROFILES <<<<<<<<<<
//     RESEED USERS TO START TESTING OVER FOR MATCHING AND REFETCHING NEW MATCHES
// THERE IS PROBABLY AN ISSUE WITH THE RECURSION