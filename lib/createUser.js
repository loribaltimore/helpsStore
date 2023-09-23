let axios = require('axios');

let createUser = async (bio, shipping, billing, contact, interests, currentUserId) => {
    console.log(interests, 'interests');
    let { firstName, lastName, age } = bio;
    let { streetName, streetNumber, city, state } = shipping;
    let billStreetName = billing.streetName;
    let billStreetNumber = billing.streetNumber;
    let billCity = billing.city;
    let billState = billing.state;
    let billSAS = billing.sameAsShipping;
    let { phone, email } = contact;
    let payload = JSON.stringify({
        firstName,
        lastName,
        age,
        streetNumber,
        streetName,
        city,
        state,
        phone,
        email,
        billStreetName,
        billStreetNumber,
        billCity,
        billState,
        billSAS,
        interests,
        currentUserId
    });
    let response = await fetch('/api/registration', {
        method: 'post',
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async data => { console.log(await data.json()); return data }).catch(err => console.log(err));
    let { data } = response;
    return data;
};

module.exports = createUser;

