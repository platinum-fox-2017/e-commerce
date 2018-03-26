const Storage = require("@google-cloud/storage")
const config = {
    CLOUD_BUCKET: 'multer-ecommerce',
    PROJECT_ID: 'hacktiv8-198016',
}
const storage = Storage({
    projectId: config.PROJECT_ID,
    keyFilename: './Hacktiv8Training-e9994bb868cf.json'
});


// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

let ImgUpload = {};
// the real middleware

ImgUpload.sendUploadToGCS = (req, res, next) => {
    console.log('masuk?????')
    console.log(req.file)
    if (!req.file) {
        return next('upload mungkin gagal');
    }

    const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
    const file = bucket.file(gcsname);
    // prepare the stream
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    // handle when upload error
    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    // handle when upload finish
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic(). //make the uploaded file public
        then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    // write the file
    stream.end(req.file.buffer);
}

module.exports = ImgUpload