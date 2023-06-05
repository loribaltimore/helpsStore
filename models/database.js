const { MongoClient } = require('mongodb'); 
const mongoose = require('mongoose');

module.exports = async () => {
  //Connecting to DB with Mongoose, because it is more straightforward than MongoClient
  if (!mongoose.connections[0].readyState) {
  await mongoose.connect('mongodb://localhost:27017/datr', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => { console.log('Now connected to Mongo')}).catch(err => console.log(err))
  } else {
    console.log('Already Connected to Mongo')
  };
}