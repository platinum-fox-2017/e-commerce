const Storage = require('@google-cloud/storage');

module.exports = {
    upload: (req, res, next) => {
        if (!req.file) return next('Tidak ada file yang di upload');

        const storage = Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.KEY_FILENAME
        });        

        let name = `${ Date.now() }.${ req.file.originalname.split('.').pop() }`;
        let file = storage.bucket(process.env.CLOUD_BUCKET).file(name);
        let stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', err => {
            req.body.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            file.makePublic(err => {
                if (err) next(err);

                req.body.url = `https://storage.googleapis.com/${ process.env.CLOUD_BUCKET }/${ name }`
                next();
            })
        });

        stream.end(req.file.buffer);
    }
}