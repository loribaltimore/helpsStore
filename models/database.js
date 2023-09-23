const mongoose = require('mongoose');
module.exports = async () => {
  let client;
  const connectionUrl = process.env.NODE_ENV === 'development' ||  process.env.NODE_ENV === undefined  ? 'mongodb://localhost:27017/helps' : "mongodb+srv://vercel-admin-user:ETPIicfqVnzDNJNr@portfolio.s3wva9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  //Connecting to DB with Mongoose, because it is more straightforward than MongoClient
  if (!mongoose.connections[0].readyState) {
 await mongoose.connect(connectionUrl, { useNewUrlParser: true })
   .then(data => { client = data.connections[0];}).catch(err => console.log(err))
  } else {
    client = mongoose.connections[0];
  };
  return client;
}
