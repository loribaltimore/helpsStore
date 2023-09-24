let generateUser =  function (firstName, lastName, age, streetNumber, streetName, city, state,
   phone, email, username, billStreetName, billStreetNumber, billCity, billState, billSAS) {
   let newUser = {
      username,
      bio: {
         firstName,
         lastName,
         age: parseInt(age)
      },
      address: {
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
      },
      contact: {
         phone,
         email,
      }
   };
   return newUser;
};

module.exports = generateUser;
