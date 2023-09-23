import { NextResponse } from 'next/server';
import User from 'models/userSchema';
import database from 'models/database';

export async function POST(request) {
    let {firstName, lastName, age, streetNumber, streetName, city, state,
        phone, email, billStreetName, billSAS,
        billStreetNumber, billCity, billState, interests, currentUserId } = await request.json().then(data => {
                return data
        }).catch(err => console.log(err));
    await database();
    let currentUser = await User.findById(currentUserId);
    currentUser.username = `${firstName} ${lastName}`;
    currentUser.bio = {
        firstName,
        lastName,
        age: parseInt(age)
    };
    currentUser.address = {
         shipping: {
            num: streetNumber,
            street: streetName,
            city: city,
            state: state,
         },
         billing: {
            num: billStreetNumber,
            street: billStreetName,
            city: billCity,
            state: billState,
            sameAsShipping: billSAS
         }
      }
    currentUser.contact = {
        phone,
        email,
    };

    interests.forEach(function (element, index) {
        currentUser.charities.interests.set(element, {score: 1, tags: {}})
    });
    await currentUser.save();
    return NextResponse.json({message: 'Sign Up Successful!'});
};