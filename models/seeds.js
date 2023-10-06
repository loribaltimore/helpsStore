let mongoose = require('mongoose');
const User = require('./userSchema');
const database = require('./database')
// let Product = require('./productSchema');
let Donation = require('./donationSchema');
let DonationQueue = require('./donationQueueSchema');
let Purchase = require('./purchaseSchema');
let Session = require('./sessionSchema');

let casual = require('casual');
let axios = require('axios');

// mongoose.connect('mongodb://localhost:27017/helps', {
//     family: 4
// }).then(console.log('Database is Live')).catch(err => console.log(err));

let seedUser = async () => {
    await User.deleteMany({});
    for (let i = 0; i < 10; i++) {
        let newUser = await new User({
            username: `dev${i}`,
            bio: {
                firstName: casual.first_name,
                lastName: casual.last_name,
                age: casual.integer(from = 18, to = 64)
            },
            address: {
                shipping: {
                    number: casual.integer(from = 1, to = 400),
                    street: casual.street,
                    city: casual.city,
                    state: casual.state,
                },
                billing: {
                    number: casual.integer(from = 1, to = 400),
                    street: casual.street,
                    city: casual.city,
                    state: casual.state,
                }
            },
            contact: {
                phone: casual.phone,
                email: `dev${i}@dev.com`
            }
        });
        // let password = 'dev';
        // await User.register(newUser, password);
        await newUser.save();
        console.log(newUser);
    };
    let allUsers = await User.find({});
    allUsers[0].username = 'dev';
    await allUsers[0].save();
};

// seedUser();

// let cleanUsers = async () => {
//     await User.deleteMany({});
//     console.log('Users Deleted!')
// };

// cleanUsers();

let seedInterests = async () => {
    let currentUser = await User.findOne({ username: 'testTwenty' });
        let newMap = new Map();
        let interests = [
            'animals',
            'climate',
            'conservation',
            'coronavirus',
            'culture'];
        interests.forEach(function (element, index) {
            newMap.set(element, { score: 1, tags: {} });
        });
    currentUser.charities.interests = newMap;
    // currentUser.charities.liked.tags.set('research', 1);
    // currentUser.charities.liked.tags.set('humans', 1);
    await currentUser.save();
    
console.log(currentUser);
console.log('finished!')
};

// seedInterests();

let seedProducts = async () => {
    await Product.deleteMany({});
    let shirt = await new Product({
        name: 'shirt',
        price: 30
    }).save();

    let hat = await new Product({
        name: 'hat',
        price: 20,
    }).save();

    let hoodie = await new Product({
        name: 'hoodie',
        price: 50
    }).save();

    let stickers = await new Product({
        name: 'stickers',
        price: 10
    }).save();
};

// seedProducts();

let seedTags = async () => {
    let currentUser = await User.findOne({ username: 'dev' });
    let allKeys = [...currentUser.charities.interests.keys()];
    allKeys.forEach(function (element, index) {
        console.log(currentUser.charities.interests.get(element).tags);
    });
    await currentUser.save();
};

// seedTags();

let allProducts = async () => {
    // await Product.deleteMany({});
    let allProducts = await Product.find({});
    await Product.deleteOne({ name: 'sdf' });
};
// allProducts();

let seedDonations = async () => {
    let currentUser = await User.findOne({ username: 'dev' });
    currentUser.charities.liked.orgs = [];

    // console.log(currentUser.charities.liked.orgs.slice(0, 5))
    // currentUser.charities.liked.orgs = currentUser.charities.liked.orgs.slice(0, 3);
    await currentUser.save();
    // currentUser.charities.liked.orgs = currentUser.charities.liked.orgs.map(function (element, index) {
    //     if (element === undefined || element === null) {
    //         return {sort: 1}
    //     } else {
    //         console.log(element)
    //         element.sort = 0;
    //         return element;
    //     }
        
    // });
    // console.log(currentUser.charities.liked.orgs);

};

// seedDonations();

let seedPermissions = async () => {
    let currentUser = await User.findOne({ username: 'dev' });
    currentUser.admin.permissions.push('admin');
    await currentUser.save();
console.log('Permissions Seeded!')
};

// seedPermissions();

let getProducts = async () => {
    // let allProducts = await Product.find({});
    let stickers = await Product.findOne({ name: 'Coin' })
    stickers.code = 'price_1MRIq1JdX2WdfgCJLpJ9fD61';
    stickers.price = 5;
    await stickers.save();
    console.log(stickers);

    // await Product.deleteOne({ name: 'Coin' });
    // allProducts.forEach(async (element, index) => {
    //     element.price += 0.01;
    //     await element.save();
    // })
};
// getProducts();

let seedDonationQueue = async () => {
    // let allDonations = await Donation.find({});
    // console.log(allDonations);
    let newQueue = await new DonationQueue({
        name: 'officialQueue'
    }).save();
    // let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    // queue.pool = new Map();
    // console.log(queue.queue.length);
    // allDonations = allDonations.map(x => x.id);
    // await DonationQueue.deleteMany({});
    // newQueue.queue = [...allDonations];
    // console.log(newQueue);
};

// seedDonationQueue();

let seedDonation = async () => {
    let cause = 'climate';
    let response = await axios({
        method: 'get',
        url: `https://partners.every.org/v0.2/browse/${cause}?apiKey=5650c89629828b8990f49fa4aeb665fd`,
        params: {
            take: '10',
        }
    }).then(data => { return data.data.nonprofits }).catch(err => console.log(err));
    console.log(response);
    let allUsers = await User.find({});
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
    officialQueue.queue = [];
    
    await officialQueue.save();
    let currentUser = await User.findOne({ username: 'dev' });
    currentUser.charities.donatedTo = new Map();
    for (let i = 0; i < 10; i++){
        response[i].coinTotal = 2;
        currentUser.charities.donatedTo.set(response[i].name, response[i]);
    };

    await currentUser.save();
    await Donation.deleteMany({});
        let rand = Math.floor(Math.random() * 10);
        let receipts = ['123987657', '9870987', '09834567', '98765678'];
    let warehouses = ['dales', 'martins', 'discount', 'sales'];
    allUsers.slice(0, 10).forEach(async (element, index) => {
        let org = response[rand];
        let randReceipt = receipts[Math.floor(Math.random() * receipts.length - 1)];
        let randWarehouse = warehouses[Math.floor(Math.random() * receipts.length - 1)];
        let newDonation = await new Donation({
            user: {
                user_id: element.id,
                firstName: element.bio.firstName,
                lastName: element.bio.lastName,
                email: element.contact.email,
            },
            org: {
                name: org.name,
                ein: org.ein,
                img: org.logoUrl
            },
            transaction: {
                amount: {
                    total: 2,
                    final: 2,
                },
                items: [
                    {
                        name: 'Classic Hoodie',
                        price: 30,
                        config: { size: 'l', colors: ['blue', 'orange'], qty: 1 },
                        img: 'https://res.cloudinary.com/demgmfow6/image/upload/v1673462847/helps/kje0cwgkhmg8ju3ivopc.jpg',
                        code: 'price_1MPUf4JdX2WdfgCJByrw5EoK',
                        sort: 0
                    },
                    {
                        name: 'Classic Hoodie',
                        price: 30,
                        config: { size: 'l', colors: ['blue', 'green'], qty: 1 },
                        img: 'https://res.cloudinary.com/demgmfow6/image/upload/v1673462847/helps/kje0cwgkhmg8ju3ivopc.jpg',
                        code: 'price_1MPUf4JdX2WdfgCJByrw5EoK',
                        sort: 0
                    }
                ],
                shipTo: element.address.shipping,
            },
            fulfillment: {
                order: {
                    allReceipts: [randReceipt],
                    allOrderedFrom: [randWarehouse]    
                }
            }
        }).save();
        console.log(newDonation.fulfillment);
        await officialQueue.addToQueue(newDonation.id);
        element.charities.donations.push(newDonation);
        element.membership.totalDonations += 2;
        org.coinTotal = 2;
        element.charities.donatedTo.set(org.name, org);
        await element.save();
    });
  
    console.log('ALL DONATIONS');
    console.log(officialQueue.history);
};

// seedDonation();

let test = async () => {
   
    // let user = await User.findOne({ username: 'testTwenty' });
    // console.log(officialQueue.queue);
    await database();
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
    officialQueue.pool = 0;
    // officialQueue.history = new Map();
    // officialQueue.pool = new Map();
    // officialQueue.allTracking = [];
    // officialQueue.queue = [];
    await officialQueue.save();
    // await Donation.deleteMany({});

    // let currentUser = await User.findById('650a02d1e5c0fbf735cb2d39');
    // currentUser.membership.totalDonations = 0;n
    // currentUser.charities.donations = [];
    // currentUser.charities.donatedTo = new Map();
    // currentUser.charities.liked.orgs = currentUser.charities.liked.orgs.slice(0, 2);
    // await currentUser.save()
};
test()

let seedPurchases = async () => {
  
    // let currentUser = await User.findOne({ name: 'dev' });
    // let shirt = await Product.findOne({ name: 'Classic T-Shirt' });
    // for (let i = 0; i < 3; i++) {
    //     let sizes = ['s', 'm', 'l', 'xl'];
    //     let newPurchase = await new Purchase({
    //         user: currentUser.id,
    //         items: [
    //             {
    //                 id: shirt.id,
    //                 name: shirt.name,
    //                 qty: i + 1,
    //                 size: sizes[i]
    //             }
    //         ],
    //         address: {
    //             num: currentUser.address.shipping.num,
    //             street: currentUser.address.shipping.street,
    //             city: currentUser.address.shipping.city,
    //             state: currentUser.address.shipping.state,
    //             country: 'USA'
    //         },
    //         orgs: [
    //             'Example Charity'
    //         ]
    //     }).save();
    //     currentUser.purchases.push(newPurchase.id);
    //     await currentUser.save();
    // };
    // console.log(currentUser.purchases);
   
};

// seedPurchases();

// seedUser()