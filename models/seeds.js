const mongoose = require('mongoose');
const database = require('./database');
const User = require('./userSchema');
const hobbies = require('../util/hobbies');
const casual = require('casual');
const fs = require('fs');
const coords = [[-122.201939, 47.730431],
[-122.229937, 47.757226],
[-122.257935, 47.784021],
[-122.285932, 47.810817],
[-122.313930, 47.837613]
];
const { GridFSBucket } = require('mongodb');


const seedUser = async () => {
    const client = await database();
    await User.deleteMany({username: {$ne: 'Powerman5000'}});
    for (let i = 0; i < 5; i++){
        const randHobby = Math.floor(Math.random() * (hobbies.length / 2));
        const randAge = Math.floor(Math.random() * 30);
        const randCoord = Math.floor(Math.random() * 5);

       const currentUser = await new User({
        username: casual.username,
        name: casual.first_name,
        description: casual.sentences(n = 4),
            hobbies: hobbies.slice(randHobby, randHobby + 6),
            location: {
                geo: {
                coordinates: coords[randCoord] || [-122.257935, 47.784021]
        }
            },
            genderId: randAge % 2 === 0 ? 'female' : 'male',
        age: randAge + 18
       })
        
        fs.readFile(randAge % 2 === 0 ? '../public/female.jpeg' : '../public/guy.jpg', (err, data) => {
            if (err) {
                throw err;
            };
            console.log(data)
            const buffer = Buffer.from(data);
            const db = client.useDb('datr');
            const bucket = new GridFSBucket(db);
            console.log(buffer);
            const filename = casual.word +  randAge % 2 === 0 ? '.jpeg' : '.jpg';
            const uploadStream = bucket.openUploadStream(filename,  {contentType:randAge % 2 === 0 ? 'image/jpeg' : 'image/jpg'});
            uploadStream.write(buffer);
            uploadStream.on('close', async function (file) {
                currentUser.photos.push(uploadStream.id.toString());
                if (currentUser.photos.length === 1) {
                    await currentUser.save();
                }
            });
            uploadStream.end();
            uploadStream.on('finish', function () {
                console.log('PHOTO UPLOADED');
            });
        });

        await currentUser.save();
        console.log(currentUser);
        console.log('User saved')
    };
};

const seedConnections = async () => {
    await database();
    const currentUser = await User.findOne({ username: 'Powerman5000' });
    currentUser.connections = new Map();
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    for (let i = 1; i < 5; i++) {
        users[i].connections = new Map();
        users[i].connections.set(users[0].id, {id: currentUser._id, status: 'liked', conversation: []});
        await users[i].save();
    };
    await currentUser.save();
}

//seed coordinates so I can use algorithm to find distance between users

const showResource = async function () {
    await database();
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    console.log(users);
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
};

// const seedLikes = async () => {
//     await database();
//     const allUsers = await User.find({});
//     allUsers.forEach(async (user, index) => {
//         if (username !== 'Powerman5000') {
//            user.
//        }
//     })
// }

// seedUser();
seedConnections();
// showResource();
// seedLoc();