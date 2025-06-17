const express = require('express');
const FishStock = require('../models/pondfishdetailsmodel');
const {upload , saveFileToGridFS} = require('./fileuploads');

const router = express.Router();

// Create fish stock
router.post('/create_pondfishdetails',upload.array("images",10), async (req, res) => {
  const { 
     fishId,
     species,
    quantity,
    pondLocation,
    feedingSchedule,
    dateStocked,
    others,
    status
    } = req.body;
    
  try {
    const newFish = new FishStock({ 
      fishId,
      species,
     quantity,
     pondLocation,
     feedingSchedule,
     dateStocked,
     others,
     status
     } );
    const savedFish = await newFish.save();
    res.status(201).json({ message: 'Fish stock created successfully', data: savedFish });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get fish stock by fishId
router.get('/pondfishdetails/:fishId', async (req, res) => {
  try {
    const fish = await FishStock.findOne({ fishId: req.params.fishId });
    if (!fish) {
      return res.status(404).json({ error: 'Fish stock not found' });
    }
    res.status(200).json(fish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update fish stock — consider changing POST to PATCH or PUT
router.post('/update_pondfishdetails/:fishId', async (req, res) => {
  try {
    const updatedFish = await FishStock.findOneAndUpdate(
      { fishId: req.params.fishId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFish) {
      return res.status(404).json({ error: 'Fish stock not found' });
    }
    res.status(200).json({ message: 'Fish stock updated successfully', data: updatedFish });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete fish stock
router.delete('/delete_pondfishdetails/:fishId', async (req, res) => {
  try {
    const deletedFish = await FishStock.findOneAndDelete({ fishId: req.params.fishId });
    if (!deletedFish) {
      return res.status(404).json({ error: 'Fish stock not found' });
    }
    res.status(200).json({ message: 'Fish stock deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
