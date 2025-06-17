const express = require("express");
const Transaction = require("../models/transactionmodel");
const { upload, saveFileToGridFS } = require("./fileuploads");
const router = express.Router();

// POST route to create a bank transaction and handle file uploads
router.post("/create_banktransactiondetails",
  upload.array("documents", 10), // assuming documents instead of images
  async (req, res) => {
    const {
      transactionId,
      amount,
      transactionType,
      date,
      description,
      accountId,
      status,
    } = req.body;

    try {
      const documentIds = [];

      // Upload each file and get its GridFS ID
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        documentIds.push(savedFile._id.toString());
      }

      // Create a new Transaction document with the uploaded document IDs
      const newTransaction = new Transaction({
        transactionId,
        amount,
        transactionType,
        date,
        description,
        accountId,
        status,
        documents: documentIds, // Assuming documents field to store attachments
      });

      const savedTransaction = await newTransaction.save();

      res.status(201).json({
        message: "Transaction with documents added successfully",
        savedTransaction,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/banktransactiondetails/:transactionId", async (req, res) => {
  try {
    const transaction = await Transaction.findById({ transactionId: req.params.transactionId }).populate("accountId");
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Error in retrieving Transaction" });
  }
});

router.post("/update_banktransactiondetails/:transactionId", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transactionId: req.params.transactionId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json({ message: "Transaction updated successfully", updatedTransaction });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete_banktransactiondetails/:transactionId", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ transactionId: req.params.transactionId });
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
