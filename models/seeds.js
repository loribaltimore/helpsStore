const mongoose = require('mongoose');
const database = require('./database');
const User = require('./userSchema');
const Connection = require('./connectionSchema');
const hobbies = require('../util/hobbies');
const casual = require('casual');
const fs = require('fs');
const coords = [[-122.201939, 47.730431],
[-122.229937, 47.757226],
[-122.257935, 47.784021],
[-122.285932, 47.810817],
[-122.313930, 47.837613],

];
const { GridFSBucket } = require('mongodb');


const seedUser = async () => {
    const client = await database();
    await User.deleteMany({});
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
const seedThemTrivia = async () => {
    await database();
    const currentUser = await User.findById('64811cb221c21a50a0ee5ae5');
    currentUser.connections.set('6483673fec9f01df94986700', {
        id: '6483673fec9f01df94986700', status: 'reciprocated', conversation: [], trivia: {
            me: false,
            them: [
                {
                    question: 'What kind of music do you enjoy2?',
                    answer: 'Pop'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answer: 'Action'
                },
                {
                    question: 'Are you an early bird or a night owl?',
                    answer: 'Early bird'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answer: 'Action'
                },
                {
                    question: 'Do you prefer coffee or tea?',
                    answer: 'Coffee'
                }
            ]
        }, review: {}
    });

    const connection = await User.findById('6483673fec9f01df94986700');
    connection.connections.set(currentUser._id, {
        id: currentUser._id, status: 'reciprocated', conversation: [], trivia: {
            them: false,
            me: [
                {
                    question: 'What kind of music do you enjoy1?',
                    answers: ['Pop', 'Rock', 'Country', 'Rap'],
                    chosen: 'Pop'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answers: ['Action', 'Comedy', 'Drama', 'Horror'],
                    chosen: 'Action'
                },
                {
                    question: 'Are you an early bird or a night owl?',
                    answers: ['Early bird', 'Night owl', 'Neither', 'Both'],
                    chosen: 'Early bird'
                },
                {
                    question: 'What is your favorite season?',
                    answers: ['Summer', 'Winter', 'Spring', 'Fall'],
                    chosen: 'Summer'
                },
                {
                    question: 'Do you prefer coffee or tea?',
                    answers: ['Coffee', 'Tea', 'Neither', 'Both'],
                    chosen: 'Coffee'
                },
                {
                    question: 'Do you prefer forest or beack?',
                    answers: ['Forest', 'Beach', 'Neither', 'Both'],
                    chosen: 'Beach'
                }
            ]
        }, review: {}
    });
    
    await connection.save();
    await currentUser.save();
console.log("THEM TRIVIA SEEDED")
};

const seedConnections = async () => {
    await database();
    const currentUser = await User.findById('64ad69466aad9c85233adcc6');
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    currentUser.connections.reciprocated = [];
    for (let i = 1; i < 5; i++) {
        if (currentUser._id !== users[i]._id) {
            // const newConnection = await new Connection({
            //     connection1: users[i]._id,
            //     trivia: {
            //         connection1: [
            //             {
            //                 question: 'What kind of music do you enjoy1?',
            //                 answers: ['Pop', 'Rock', 'Country', 'Rap'],
            //                 chosen: 'Pop'
            //             },
            //             {
            //                 question: 'What is your favorite movie genre?',
            //                 answers: ['Action', 'Comedy', 'Drama', 'Horror'],
            //                 chosen: 'Action'
            //             },
            //             {
            //                 question: 'Are you an early bird or a night owl?',
            //                 answers: ['Early bird', 'Night owl', 'Neither', 'Both'],
            //                 chosen: 'Early bird'
            //             },
            //             {
            //                 question: 'What is your favorite season?',
            //                 answers: ['Summer', 'Winter', 'Spring', 'Fall'],
            //                 chosen: 'Summer'
            //             },
            //             {
            //                 question: 'Do you prefer coffee or tea?',
            //                 answers: ['Coffee', 'Tea', 'Neither', 'Both'],
            //                 chosen: 'Coffee'
            //             },
            //             {
            //                 question: 'Do you prefer forest or beack?',
            //                 answers: ['Forest', 'Beach', 'Neither', 'Both'],
            //                 chosen: 'Beach'
            //             }
            //         ]
            //     }
            // }).save();
            currentUser.connections.pending.push(users[i]._id);
        }
    };
    await currentUser.save();
    // seedThemTrivia();
};

//seed coordinates so I can use algorithm to find distance between users

const showResource = async function () {
    await database();
    const users = await User.find({})
        .then(data => { return data }).catch(err => console.log(err));
    // console.log(Object.fromEntries(users[2].connections)['64811cb221c21a50a0ee5ae5']);
    console.log(users[1].connections.get('64811cb221c21a50a0ee5ae5'));
    console.log(users.map(user => { return { id: user._id, name: user.name, connections: user.connections } }));
};

const seedLoc = async () => {
    await database();
    const allUsers = await User.find({});
    allUsers.forEach(async (user, index) => {
        const randCoord = Math.floor(Math.random() * 5);
        user.location.geo.coordinates = coords[randCoord] || [-122.257935, 47.784021];
        user.hobbies = [hobbies[index], hobbies[index + 1], hobbies[index + 2], hobbies[index + 3], hobbies[index + 4], hobbies[index + 5]]
        await user.save();
    })
};

const seedSocketUser = async () => {
    await database();
    const socketUser = await User.findById('649f01847167490c3d622445');
    const currentUser = await User.findById('64811cb221c21a50a0ee5ae5');

    currentUser.connections.set('649f01847167490c3d622445', {
        id: '649f01847167490c3d622445', status: 'reciprocated', conversation: [], trivia: {
            me: false,
            them: [
                {
                    question: 'What kind of music do you enjoy?',
                    answer: 'Pop'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answer: 'Action'
                },
                {
                    question: 'Are you an early bird or a night owl?',
                    answer: 'Early bird'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answer: 'Action'
                },
                {
                    question: 'Do you prefer coffee or tea?',
                    answer: 'Coffee'
                }
            ]
        }, review: {}
    });

    socketUser.connections.set('64811cb221c21a50a0ee5ae5', {
        id: '64811cb221c21a50a0ee5ae5', status: 'reciprocated', conversation: [], trivia: {
            them: false,
            me: [
                {
                    question: 'What kind of music do you enjoy?',
                    answers: ['Pop', 'Rock', 'Country', 'Rap'],
                    chosen: 'Pop'
                },
                {
                    question: 'What is your favorite movie genre?',
                    answers: ['Action', 'Comedy', 'Drama', 'Horror'],
                    chosen: 'Action'
                },
                {
                    question: 'Are you an early bird or a night owl?',
                    answers: ['Early bird', 'Night owl', 'Neither', 'Both'],
                    chosen: 'Early bird'
                },
                {
                    question: 'What is your favorite season?',
                    answers: ['Summer', 'Winter', 'Spring', 'Fall'],
                    chosen: 'Summer'
                },
                {
                    question: 'Do you prefer coffee or tea?',
                    answers: ['Coffee', 'Tea', 'Neither', 'Both'],
                    chosen: 'Coffee'
                },
                {
                    question: 'Do you prefer forest or beack?',
                    answers: ['Forest', 'Beach', 'Neither', 'Both'],
                    chosen: 'Beach'
                }
            ]
        }, review: {}
    });
    await currentUser.save();
    await socketUser.save();
};



seedUser();
// seedConnections();
// seedSocketUser();
// showResource();
// seedLoc();
// seedThemTrivia();
