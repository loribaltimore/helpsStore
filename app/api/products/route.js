import Product from 'models/productSchema';
import { NextResponse } from 'next/server';
import database from 'models/database';
import { GridFSBucket } from 'mongodb';
import { fileTypeFromBuffer } from 'file-type';
import casual from 'casual';

async function handleFileUpload(value, client, newProduct, res) {
    const dbName = 'helps';
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
            newProduct.img.push(uploadStream.id.toString());
            resolve();
        });
        uploadStream.on('error', reject);
    });
}

export async function POST(request) {
    const client = await database();
    const res = await request.formData();
    const filePromises = [];
     const newProduct = await new Product({});

    for (let entry of res.entries()) {
        let [name, value] = entry;
        if (name === 'files[]') {
            if (name === 'files[]') {
                const promise = handleFileUpload(value, client, newProduct, res);
                filePromises.push(promise);
            } else {
                handleFormField(name, value, newProduct);
            }
        };

        await Promise.all(filePromises);

        if (name === 'name') {
            newProduct.name = value;
            if (!/sticker|hat/.test(name)) {
                newProduct.sizeable = true
            }
        } else if (name === 'price') {
            newProduct.price = value;
        } else if (name === 'cost') {
            newProduct.cost = value;
        } else if (name === 'code') {
            newProduct.code = value;
        } else if (name === 'lead') {
            newProduct.lead = value;
        } else {
            newProduct[name] = value;
        };
    };
        await newProduct.save();

    let allProducts = await Product.find({})
        .then(data => { return data }).catch(err => console.log(err));

    return NextResponse.json({ allProducts });
};


export async function GET(req, res, next) {
    let allProducts = await Product.find({}).
        then(data => { return data }).catch(err => console.log(err));
    allProducts.sort(function (a, b) {
        return a.sold - b.sold
    });

    return NextResponse.json({ allProducts });
};

export async function DELETE(req, res, next) {
    let { id } = await req.json();
    await Product.findByIdAndDelete(id);
    let allProducts = await Product.find({})
        .then(data => { return data }).catch(err => console.log(err));
    return NextResponse.json({ allProducts });
};

export async function PUT(req, res, next) {
    let { name, price, cost, lead, id } = req.body;
    let newImg = req.files.map(function (element, index) {
        return { filename: element.filename, path: element.path }
    });
    await Product.findByIdAndUpdate(id, { name, price, cost, lead, img: newImg });
    let allProducts = await Product.find({});
    return NextResponse.json(allProducts);
};

// module.exports.addImage = async (req, res, next) => {
//     console.log('is working');
//     await extractor(req.file)
//     .then(data => { console.log(data); }).catch(err => console.log(err))
// };
