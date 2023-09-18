import database from 'models/database';
import { GridFSBucket, ObjectId } from 'mongodb';

const dbName = process.env.NODE_ENV === 'development' ? 'datr' : 'myFirstDatabase';

export default async function handler(request, response) {
    const {photoId} = request.query;

        const client = await database();
        const db = client.useDb(dbName);
  const bucket = new GridFSBucket(db);
      const downloadStream = bucket.openDownloadStream(new ObjectId(photoId[0]));
    let chunks = [];  // an array to collect the chunks of binary data

    downloadStream.on('error', (error) => {
        console.log('ERROR HERE', error);
        response.status(500).send("Internal server error");
    });

    downloadStream.on('file', (file) => {
        if (file && file.contentType) {
            response.setHeader('Content-Type', file.contentType);
        }
    });

    downloadStream.on('data', chunk => {
        chunks.push(chunk);  // collect each chunk
    });

    downloadStream.on('end', () => {
        const data = Buffer.concat(chunks); // concatenate them together
      return response.send(data);  // send the full data
    });
}
