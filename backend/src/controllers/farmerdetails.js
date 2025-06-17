const express=require('express');
const FarmerDetail = require('../models/farmermodel');
const {upload , saveFileToGridFS} = require('./fileuploads');

const router=express.Router();


  
router.post("/create_farmerdetails",upload.array("images",10), async (req, res) => {
   const{
    farmerId,
    name,
    age,
    address,
    phone,
    farmSize,
    crops,
    dateJoined,
    status,
  } = req.body;


   
    try {

      const imageIds = [];

      // Upload each file and get its GridFS ID
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        const uploadedFileId = savedFile._id.toString();
        imageIds.push(uploadedFileId);
      }

      const newFarmer = new FarmerDetail({farmerId,
        name,
        age,
        address,
        phone,
        farmSize,
        crops,
        dateJoined,
        status});
      const savedFarmer = await newFarmer.save();
      res.status(201).json({ message: "Farmer added successfully", farmer: savedFarmer });
    } catch (error) {
      console.error("Error adding farmer:", error);
      res.status(500).json({ message: "Failed to add farmer", error });
    }
  });

  router.post("/update_farmerdetails/:id", async (req, res) => {
    console.log(req.body,req.params.id)
    try {
      const updatedFarmer = await FarmerDetail.findOneAndUpdate({farmerId:req.params.id}, req.body, {
        new: true
      });
      if (!updatedFarmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      res.status(200).json({ message: "Farmer updated successfully", farmer: updatedFarmer });
    } catch (error) {
      res.status(500).json({ message: "Error updating farmer" });
    }
  });
  
router.delete("/delete_farmerdertails/:id", async (req, res) => {
    try {
      const deletedFarmer = await FarmerDetail.findOneAndDelete({farmerId:req.params.id});
      if (!deletedFarmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      res.status(200).json({ message: "Farmer deleted successfully", farmer: deletedFarmer });
    } catch (error) {
      res.status(500).json({ message: "Error deleting farmer" });
    }
  });
  
  router.get("/farmerdetails/:id", async (req, res) => {
    try {
      const farmers = await FarmerDetail.findById(req.params.id);
      if(!farmers) return res.status(404).json({ error:"Farmer not found"});
      res.status(200).json(farmers);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving farmers" });
    }
  });

 

module.exports=router;