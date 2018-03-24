const multer = require('multer')
const Storage = require('@google-cloud/storage')

const config = {
  CLOUD_BUCKET: 'polaroid.herbyherado.com',
  PROJECT_ID: 'herbyherado'
}
// prepares storage
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'herbyherado-9e0f97ccfeb0.json'
})
// sets target bucket
const bucket = storage.bucket(config.CLOUD_BUCKET)

// helper to create absolute path to GCS
function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// the middleware
module.exports = {
  sendUploadToGCS: (req, res, next) => {
    console.log('masuk')
    if(!req.file) {
      return next('Failed to upload')
    }
    // names the file in an unique manner
    const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
    const file = bucket.file(gcsname);
  
    // prepares to write stream
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })
  
    // handles error
    stream.on('error', err => {
      req.file.cloudStorageError = err
      next(err)
    })
  
    // handles on finish upload
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      file.makePublic()
        .then(() => {
          req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
          next()
        })
    })
    stream.end(req.file.buffer)
  }
}
