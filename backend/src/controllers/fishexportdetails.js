const express=require('express');
const FishExportDetail = require('../models/fishexportdetailsmodel');
const {upload , saveFileToGridFS} = require('./fileuploads');

const router=express.Router();


router.post('/create_fishexportdetails',upload.array("images",10), async (req, res) => {
  const {
    exportId,
    fishType,
    trys,
    quantity,
    fishnumber,
    fishaverage,
    destination,
    exportDate,
    exporterName,
    documentation,
    status
  } = req.body;

  try {
    const imageIds = [];

      // Upload each file and get its GridFS ID
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        const uploadedFileId = savedFile._id.toString();
        imageIds.push(uploadedFileId);
      }

    const newExport = new FishExportDetail({
      exportId,
      fishType,
      trys,
      quantity,
      fishnumber,
      fishaverage,
      destination,
      exportDate,
      exporterName,
      documentation,
      status
    });

    const savedExport = await newExport.save();
    res.status(201).json({ message: 'Fish export created successfully', savedExport });
  } catch (err) {
          console.error("Error adding Fishexportdetails:", error);

    res.status(400).json({ message:"Failed to add Fish Export details", error });
  }
});



router.get('/fishexportdetails/:exportId', async (req, res) => {
  try {
    const exportData = await FishExportDetail.findOne({ exportId: req.params.exportId });
    if (!exportData) return res.status(404).json({ error: 'Export not found' });
    res.status(200).json(exportData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/update_fishexportdetails/:exportId', async (req, res) => {
  try {
    const updatedExport = await FishExportDetail.findOneAndUpdate(
      { exportId: req.params.exportId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedExport){
     return res.status(404).json({ error: 'Export not found' });
    }
     res.status(200).json({ message: 'Export updated successfully', updatedExport });
  } catch (err) {
    res.status(400).json({ message: "Error updating farmer"  });
  }
});


router.delete('/delete_fishexportdetails/:exportId', async (req, res) => {
  try {
    const deletedExport = await FishExportDetail.findOneAndDelete({ exportId: req.params.exportId });
    if (!deletedExport) {return res.status(404).json({ error: 'Export not found' });
  }
    res.status(200).json({ message: 'Export deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Error deleting in Export details" });
  }
});



module.exports=router;