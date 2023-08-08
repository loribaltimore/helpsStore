import database from 'models/database';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function getPhotos(allPhotos) {
        const client = await database();
        const db = client.useDb('datr');
    const bucket = new GridFSBucket(db);
  
    
    const allFormattedPhotos = Promise.all(allPhotos.map(async (photo, index) => {
         const downloadStream = bucket.openDownloadStream(new ObjectId(photo));
        const chunks = [];

      return new Promise((resolve, reject) => {
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

        downloadStream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = downloadStream.contentType;;
          const dataUrl = `data:${contentType};base64,${buffer.toString('base64')}`;
        resolve(dataUrl);
      });

        downloadStream.on('error', (error) => {
        console.log('ERROR HERE')
        reject(error);
      });
    });
  }))
    return allFormattedPhotos;
}