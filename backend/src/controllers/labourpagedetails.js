const express=require('express');
const LaborPageDetail = require('../models/labourpagedetailsmodel'); 
const {upload , saveFileToGridFS} = require('./fileuploads');

const router=express.Router();
            

router.post('/create_labourpagedetails',upload.array("images",10), async (req, res) => {
  const {labourId,
    name,
    role,
    salary,
    salarycredit,
    totalPayment,
    dateOfWork,
    iceCans,  
    husk,
    VehicleAdvance,
    transportCharges,
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

    const newLabour = new LaborPageDetail({labourId,
      name,
      role,
      salary,
      salarycredit,
      totalPayment,
      dateOfWork,
      iceCans,  
      husk,
      VehicleAdvance,
      transportCharges,
      status
  });
    const savedLabour = await newLabour.save();
    res.status(201).json({ message: 'Labour detail created successfully', data: savedLabour });
  } catch (err) {
          console.error({message:"Error adding Labourdetails:", error});

    res.status(400).json({ message: "Failed to add Labourdetails", error });
  }
});

router.get('/labourpagedetails/:labourId', async (req, res) => {
    try {
      const labour = await LaborPageDetail.findOne({ labourId: req.params.labourId });
      if (!labour) return res.status(404).json({ error: 'Labour not found' });
      res.status(200).json(labour);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.post('/update_labourpagedetails/:labourId', async (req, res) => {
        console.log(req.body,req.params.id)

    try {
      const updatedLabour = await LaborPageDetail.findOneAndUpdate(
        { labourId: req.params.labourId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedLabour) return res.status(404).json({ error: 'Labour not found' });
      res.status(200).json({ message: 'Labour detail updated successfully', data: updatedLabour });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/delete_labourpagedetails/:labourId', async (req, res) => {
    try {
      const deletedLabour = await LaborPageDetail.findOneAndDelete({ labourId: req.params.labourId });
      if (!deletedLabour) return res.status(404).json({ error: 'Labour not found' });
      res.status(200).json({ message: 'Labour detail deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports=router;