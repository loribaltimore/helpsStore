const mongoose = require('mongoose');
const database = require('./database');
const User = require('./userSchema');
const hobbies = require('../util/hobbies');
const casual = require('casual');

const coords = [  [-122.201939, 47.730431],
  [-122.229937, 47.757226],
  [-122.257935, 47.784021],
  [-122.285932, 47.810817],
  [-122.313930, 47.837613]
]

const seedUser = async () => {
    await database();
    for (let i = 0; i < 20; i++){
        const randHobby = Math.floor(Math.random() * (hobbies.length / 2));
        const randAge = Math.floor(Math.random() * 30);
        const randCoord = Math.floor(Math.random() * 5);
        await new User({
        username: casual.username,
        name: casual.first_name,
        description: casual.sentences(n = 4),
            hobbies: hobbies.slice(randHobby, randHobby + 6),
            location: {
                geo: {
                coordinates: coords[randCoord] || [-122.257935, 47.784021]
        }
            },
        age: randAge + 18
            }).save();
        console.log('User saved')
    };
};

const seedConnections = async () => {
        await database();
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    for (let i = 1; i < 6; i++) {
        users[0].connections.set(users[i].id, {id: users[i].id, status: 'reciprocated', conversation: []});
        users[i].connections.set(users[0].id, {id: users[0].id, status: 'reciprocated', conversation: []});
        await users[i].save();
    };
    await users[0].save();
}

//seed coordinates so I can use algorithm to find distance between users

const showResource = async function () {
    await database();
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    console.log(users);
    users.forEach((user, index) => { console.log(user.location.geo.coordinates) });
};

const seedLoc = async () => {
    await database();
    const allUsers = await User.find({});
    allUsers.forEach(async (user, index) => {
        const randCoord = Math.floor(Math.random() * 5);
        user.location.geo.coordinates = coords[randCoord] || [-122.257935, 47.784021];
        user.hobbies = [hobbies[index], hobbies[index + 1], hobbies[index + 2], hobbies[index + 3], hobbies[index + 4], hobbies[index + 5]]
        await user.save();
        console.log(user.location.geo.coordinates);
    })
}

// seedUser();
// seedConnections();
// showResource();
// seedLoc();