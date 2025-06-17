const express = require("express");
const FeedDetail = require("../models/feeddetailsmodel");
const { upload, saveFileToGridFS } = require("./fileuploads");

const router = express.Router();

// POST route to create feed details and handle file uploads
router.post(
  "/create_feeddetails",
  upload.array("images", 10),
  async (req, res) => {
    const {
      feedId,
      feedType,
      ingredients,
      quantity,
      supplier,
      dateAdded,
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

      // Create a new FeedDetail document with the uploaded image IDs
      const newFeed = new FeedDetail({
        feedId,
        feedType,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
        quantity,
        supplier,
        dateAdded,
        status,
        images: imageIds,
      });

      const savedFeed = await newFeed.save();

      // Respond with the saved feed details
      res.status(201).json({
        message: "Feed with multiple images added successfully",
        savedFeed,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/feeddetails/:id", async (req, res) => {
  try {
    const feed = await FeedDetail.findById(req.params.id);
    if (!feed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update_feeddetails/:feedId", async (req, res) => {
  try {
    const updatedFeed = await FeedDetail.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json({ message: "Feed updated", updatedFeed });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete_feeddetails/:id", async (req, res) => {
  try {
    const deletedFeed = await FeedDetail.findOneAndDelete(req.params.id);
    if (!deletedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json({ message: "Feed deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
