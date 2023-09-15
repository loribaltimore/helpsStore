import { NextResponse } from "next/server";
import User from 'models/userSchema';
import database from 'models/database';
import {getServerSession} from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { GridFSBucket } from 'mongodb';
import { fileTypeFromBuffer } from 'file-type';
import casual from 'casual';


async function handleFileUpload(value, client, currentUser, res) {
    const dbName = process.env.NODE_ENV === 'development' ? 'datr' : 'myFirstDatabase';
    const db = client.useDb(dbName);

    const buffer = await value.arrayBuffer();
  const fileType = await fileTypeFromBuffer(Buffer.from(buffer));
  
  if (!fileType) {
        throw new Error("Unsupported file type");
    }

    const bucket = new GridFSBucket(db);
    const filename = `${casual.word}.${fileType.ext}`;  // Using the returned extension
    const options = {
        contentType: fileType.mime, // Using the returned mime type
    };

    const uploadStream = bucket.openUploadStream(filename, options);

    return new Promise((resolve, reject) => {
        uploadStream.write(buffer);
        uploadStream.end();
        uploadStream.on('finish', function () {
            currentUser.photos.push(uploadStream.id.toString());
            resolve();
        });
        uploadStream.on('error', reject);
    });
}

export async function POST(request) {
    const client = await database();
    const session = await getServerSession(authOptions);
    const res = await request.formData();
    const currentUser = await User.findById(session.userId.toString()).then(data => data).catch(err => console.log(err));
const filePromises = [];
  for (let entry of res.entries()) {
    let [name, value] = entry;
    if (name === 'files[]') {
      if (name === 'files[]') {
        const promise = handleFileUpload(value, client, currentUser, res);
        filePromises.push(promise);
      } else {
        handleFormField(name, value, currentUser);
      }
    }
    await Promise.all(filePromises);
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
    } else if (name === 'Openness') {
      currentUser.personality.openness = value;
    } else if (name === 'Conscientiousness') {
      currentUser.personality.conscientiousness = value;
    } else if (name === 'Agreeableness') {
      currentUser.personality.agreeableness = value;
    } else if (name === 'Extraversion') {
      currentUser.personality.extraversion = value;
    } else if (name === 'Neuroticism') {
      currentUser.personality.neuroticism = value;
    } else {
      currentUser[name] = value;
    };
  };
      await currentUser.save();

      return NextResponse.json({ message: 'User Created' });
    };
