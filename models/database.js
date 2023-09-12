const mongoose = require('mongoose');
module.exports = async () => {
  let client;
  const connectionUrl = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/datr' : 'mongodb+srv://dmksoc:v7TjmD4FzSk9UAV9@portfolio.s3wva9j.mongodb.net/';
   //Connecting to DB with Mongoose, because it is more straightforward than MongoClient
  if (!mongoose.connections[0].readyState) {
 await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(data => { client = data.connections[0];}).catch(err => console.log(err))
  } else {
    client = mongoose.connections[0];
  };
  return client;
}
