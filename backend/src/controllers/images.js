const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Serve image from GridFS
router.get('/:id', (req, res) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });

  const imageId = req.params.id;
  console.log(`Requesting image ID: ${imageId}`);

  try {
    const objectId = new mongoose.Types.ObjectId(imageId);
    const downloadStream = bucket.openDownloadStream(objectId);

    downloadStream.on('error', (err) => {
      console.error(`Error serving image (ID: ${imageId}): ${err.message}`);
      res.send('Image not found');
    });

    res.set('Content-Type', 'image/jpeg'); // Adjust content type if necessary
    downloadStream.pipe(res);
  } catch (error) {
    console.log(`Invalid image ID: ${imageId}, Error: ${error.message}`);
    res.status(400).send('Invalid image ID');
  }
});

module.exports = router;
