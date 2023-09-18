import database from 'models/database';
import { GridFSBucket, ObjectId } from 'mongodb';

const dbName = process.env.NODE_ENV === 'development' ? 'datr' : 'myFirstDatabase';

export async function getPhotos(photoId) {

        const client = await database();
        const db = client.useDb(dbName);
  const bucket = new GridFSBucket(db);

      const downloadStream = bucket.openDownloadStream(new ObjectId(photoId));

    downloadStream.on('error', (error) => {
        console.log('ERROR HERE', error);
        res.status(500).send("Internal server error");
    });

    // Set the Content-Type if available
    downloadStream.on('file', (file) => {
        if (file && file.contentType) {
            res.set('Content-Type', file.contentType);
        }
    });

    downloadStream.pipe(res);

  
    // const allFormattedPhotos = await Promise.all(allPhotos.map(async (photo, index) => {
    //      const downloadStream = bucket.openDownloadStream(new ObjectId(photo));
    //     const chunks = [];

    //   return new Promise((resolve, reject) => {
    //   downloadStream.on('data', (chunk) => {
    //     chunks.push(chunk);
    //   });

    //     downloadStream.on('end', () => {
    //       const buffer = Buffer.concat(chunks);
    //       const contentType = downloadStream.contentType;;
    //       const dataUrl = `data:${contentType};base64,${buffer.toString('base64')}`;
    //     resolve(dataUrl);
    //   });

    //     downloadStream.on('error', (error) => {
    //     console.log('ERROR HERE')
    //     reject(error);
    //   });
    // });
    // }))
    return allFormattedPhotos;
};

