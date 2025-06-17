const { default: mongoose } = require("mongoose");
const multer = require("multer");

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to save file to GridFS
const saveFileToGridFS = async (file) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);

    uploadStream.on('finish', () => {
      console.log(`
        Uploaded file: ${file.originalname} with ID: ${uploadStream.id}`
      );
      resolve({ _id: uploadStream.id });
    });

    uploadStream.on('error', (error) => {
      console.error(`
        Error uploading file: ${file.originalname}, Error: ${error.message}`
      );
      reject(error);
    });
  });
};


module.exports = {
  saveFileToGridFS,
  upload
}