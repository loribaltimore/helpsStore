const mongoose = require('mongoose');
const database = require('./database');
const User = require('./userSchema');
const hobbies = require('../util/hobbies');
const casual = require('casual');

const seedUser = async () => {
        await database();

    await User.deleteMany({});

    for (let i = 0; i < 20; i++){
        const randHobby = Math.floor(Math.random() * (hobbies.length / 2));
        const randAge = Math.floor(Math.random() * 30);
            await new User({
        name: {
            first: casual.first_name,
            last: casual.last_name
        },
        description: casual.sentences(n = 4),
        hobbies: hobbies.slice(randHobby, randHobby + 6),
        age: randAge
            }).save();
        console.log('User saved')
    };
};

const seedConnections = async () => {
        await database();

    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    console.log(users);
    // for (let i = 1; i < 6; i++) {
    //     users[0].connections.set(users[i].id, {id: users[i].id, status: 'reciprocated', conversation: []});
    //     users[i].connections.set(users[0].id, {id: users[0].id, status: 'reciprocated', conversation: []});
    //     await users[i].save();
    // };
    // await users[0].save();
}

// seedUser();
seedConnections();