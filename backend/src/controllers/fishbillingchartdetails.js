const express = require('express');
const FishChartBillingDetail = require("../models/fishbillingchartmodel"); // Adjust the path as necessary
const { upload, saveFileToGridFS } = require("./fileuploads");

const router = express.Router();

// Create a new billing detail
router.post(
    '/create_fishbillingchartdetails', 
    upload.array("images", 10), 
    async (req, res) => {
        const {
            fishchartId,
            SNo,
            date,
            fishVariety,
            Trys,
            Kgs,
            pieces,
            Average,
            totalKgs,
            totalTonnage,
            Rate,
            Amount,
            grandTotalAmount,
            Advance,
            comm,
            others,
            payments,
            paymentMethod,
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

            // Create a new FishChartBillingDetail instance
            const newFishChart = new FishChartBillingDetail({
                fishchartId,
                SNo,
                date,
                fishVariety,
                Trys,
                Kgs,
                pieces,
                Average,
                totalKgs,
                totalTonnage,
                Rate,
                Amount,
                grandTotalAmount,
                Advance,
                comm,
                others,
                payments,
                paymentMethod,
                status,
                images: imageIds // Assuming you want to store the image IDs in the schema
            });

            const savedFishChart = await newFishChart.save(); // Await the save operation
            res.status(201).json({ message: "Fish chart added successfully", savedFishChart });
        } catch (error) {
            console.error("Error adding fish chart:", error);
            res.status(500).json({ message: "Failed to add fish chart", error });
        }
    }
);

// Get a billing detail by ID
router.get('/fishbillingchartdetails/:id', async (req, res) => { // Fixed the route to include a slash before :id
    try {
        const billingDetail = await FishChartBillingDetail.findById(req.params.id);
        if (!billingDetail) return res.status(404).json({ error: "Fish billing chart not found" });
        
        res.status(200).send(billingDetail);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving chart details" });
    }
});

// Update a billing detail by ID
router.post('/update_fishbillingchartdetails/:id', async (req, res) => {
    console.log(req.body, req.params.id);
    try {
        const updatedBillingDetail = await FishChartBillingDetail.findOneAndUpdate(
            { fishchartId: req.params.id }, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedBillingDetail) {
            return res.status(404).json({ message: "Fish billing chart not found" });
        }
        
        res.status(200).json({ message: "Fish billing chart updated successfully", billingDetail: updatedBillingDetail });
    } catch (error) {
        console.error("Error updating fish billing chart:", error);
        res.status(500).json({ message: "Error updating fish billing chart" });
    }
});

// Delete a billing detail by ID
router.delete('/delete_fishbillingchartdetails/:id', async (req, res) => {
    try {
        const deletedBillingDetail = await FishChartBillingDetail.findOneAndDelete({ fishchartId: req.params.id });
        if (!deletedBillingDetail) {
            return res.status(404).json({ message: "Fish billing chart not found" });
        }
        res.status(200).json({ message: "Fish billing chart deleted successfully", billingDetail: deletedBillingDetail });
    } catch (error) {
        console.error("Error deleting fish billing chart:", error);
        res.status(500).json({ message: "Error deleting fish billing chart" });
    }
});

module.exports = router;
