let cloudinary = require('cloudinary').v2;
let sharp = require('sharp');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let extractor = async (img) => {
    let response = undefined;
    let filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
    await sharp(img.buffer)
        .resize({width: 640, height: 640, fit: 'cover'}).toFile(`./public/img/${filename}.jpeg`).then(data => console.log(data))
       
    await cloudinary.uploader.upload(`./public/img/${filename}.jpeg`,
        { folder: 'helps' },
    ).then(data => {
        console.log('CLOUDINARY');
        response = { filename: data.original_filename, path: data.secure_url }
    });
    return response;
};

module.exports = extractor;