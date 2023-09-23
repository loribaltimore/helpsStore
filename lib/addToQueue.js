let DonationQueue = require('../../models/donationQueueSchema');
let Donation = require('../../models/donationSchema');
let User = require('../../models/userSchema');

let addToQueue = async (cart) => {
    let { toDonate, currentUser, items } = cart;
    console.log('THIS IS ITEMS');
    items = items.filter(x => x.name !== 'Coin');
    console.log('this is toDonate');
    console.log(currentUser);
    let activeUser = await User.findById(currentUser);
    activeUser.charities.items.push(...items);
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' })
        .then(data => { return data }).catch(err => console.log(err));
    console.log(activeUser.charities.donatedTo);
    console.log('THESE ARE THE ITEMS');

    let newDonation = await new Donation({
        user: {
            user_id: activeUser.id,
            firstName: activeUser.bio.firstName,
            lastName: activeUser.bio.lastName,
            email: activeUser.contact.email,
        },
        orgs: [],
            transaction: {
                amount: {
                    total: 0,
                    final: 0,
                },
                items: items,
                shipTo: activeUser.address.shipping
            }
    }).save();
    
    for (let i = 0; i < toDonate.length; i++){
        await activeUser.addDonation(toDonate[i].coinTotal, activeUser._id);
        newDonation.transaction.total += toDonate[i].coinTotal;
        let { ein, slug } = toDonate[i];
        console.log(toDonate[i].coverImageUrl);
        newDonation.orgs.push({
            coverImg: toDonate[i].coverImageUrl,
            name: toDonate[i].name,
            ein:
                ein !== undefined ?
                    ein : '',
            slug:
                slug !== undefined ?
                    slug : '',
            img: toDonate[i].logoUrl,
            description: toDonate[i].description,
            logo: toDonate[i].logoUrl,
            coinTotal: toDonate[i].coinTotal
       });
            await newDonation.save();
        console.log('.GET = ')
        console.log(activeUser.charities.donatedTo.get(toDonate[i].name))
        if (activeUser.charities.donatedTo.get(toDonate[i].name) === undefined) {
            console.log('IT IS UNDEFINED');
            console.log(toDonate[i].name);
            console.log(toDonate[i]);
            activeUser.charities.donatedTo.set(toDonate[i].name, toDonate[i]);
        } else {
            console.log('IT IS DEFINED');
            console.log(toDonate[i].name);
            let getValue = activeUser.charities.donatedTo.get(toDonate[i].name);
            let { description, ein, name, profileUrl, logoUrl, coverImageUrl, logoCloudinaryId,
                matchedTerms, slug, location, tags, sort, mongo_id, coinTotal} = getValue;
            let updatedValue = {
                description,
                ein,
                name,
                profileUrl,
                logoUrl,
                coverImageUrl,
                logoCloudinaryId,
                matchedTerms,
                slug,
                location,
                tags,
                sort,
                mongo_id,
                coinTotal
            };
            console.log(updatedValue.coinTotal)
            updatedValue.coinTotal += toDonate[i].coinTotal;
            console.log(updatedValue);
            activeUser.charities.donatedTo.set(toDonate[i].name, updatedValue);
            console.log(activeUser.charities.donatedTo.get(toDonate[i].name));
            await officialQueue.addToHistory(toDonate[i].name, toDonate[i].coinTotal);
            if (toDonate[i].name === 'helps Pool') {
            await officialQueue.addToPool(cart.pool,
                cart.activeUser.bio.firstName + ' ' + cart.activeUser.bio.lastName, cart.activeUser._id);
            }
        };
    };

        console.log('THIS IS THE DONATION');
    console.log(newDonation);
    console.log(officialQueue.pool);
        activeUser.charities.donations.push(newDonation);
    await officialQueue.addToQueue(newDonation.id);
    await activeUser.save();
    return officialQueue;
};

module.exports = addToQueue;



// program ability to donate more than one coin per charityByCause;
// program pool => prompt to submit remainder of funds to pool;
// pool selects random charity => new donation added to queue;