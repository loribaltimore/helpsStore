import { NextResponse } from "next/server";
import User from 'models/userSchema';
import database from 'models/database';
import {getServerSession} from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { GridFSBucket } from 'mongodb';
import casual from 'casual';

export async function POST(request) {
    const client = await database();
    const session = await getServerSession(authOptions);
    const res = await request.formData();
    const currentUser = await User.findById(session.userId.toString()).then(data => data).catch(err => console.log(err));
  
    for (let entry of res.entries()) {
        let [name, value] = entry;
        const totalPhotos = res.getAll('files[]').length;
      if (name === 'files[]') {
        const db = client.useDb('datr');
        const bucket = new GridFSBucket(db);
          const buffer = value;
            const filename = casual.word + '.png';
            const uploadStream = bucket.openUploadStream(filename);
          uploadStream.write(buffer);
          uploadStream.on('close', async function (file) {
              currentUser.photos.push(uploadStream.id.toString());
              if (currentUser.photos.length === totalPhotos) {
               await currentUser.save();
              }
          });
          uploadStream.end();
          uploadStream.on('finish', function () {
          });
      }
      if (name === 'coordinates') {
       currentUser.location.geo.coordinates = value.split(',');
      } else if (name === 'hobbies') {
          currentUser.hobbies = value.split(',');
      } else if (name === 'preferredAge') {
        currentUser.preferences.age = value;
      } else if (name === 'preferredDistance') {
        currentUser.preferences.range = value;
      } else if (name === 'preferredGender') {
          currentUser.preferences.gender = value;
      } else {
          currentUser[name] = value;
      };
      await currentUser.save();
    console.log(`Name: ${name}, Value: ${value}`);
    };
    return NextResponse.json({ message: 'User Created' });
}