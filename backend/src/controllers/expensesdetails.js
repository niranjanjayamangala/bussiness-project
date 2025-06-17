const express = require('express');
const ExpenseDetail = require('../models/expensemodel'); // Adjust path as needed
const {upload , saveFileToGridFS} = require('./fileuploads');

const router = express.Router();

// ✅ Create a new expense
router.post('/create_expensedetails', upload.array("images",10),async (req, res) => {
  const {
    expenseId,
    amount,
    category,
    date,
    description,
    paymentMethod,
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

  
    const newExpense = new ExpenseDetail({
      expenseId,
      amount,
      category,
      date,
      description,
      paymentMethod,
      status
    });

    const savedExpense = await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", savedExpense });
  } catch (err) {
    console.error("Error adding expenses:", error);
    res.status(400).json({ message:"Failed to add expenses", error });
  }
});

// ✅ Update an expense by ID
router.post('/update_expensedetails/:expenseId', async (req, res) => {
      console.log(req.body,req.params.id)

    try {
      const updatedExpense = await ExpenseDetail.findOneAndUpdate(
        { expenseId: req.params.expenseId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedExpense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json({message:"expenses updated successfully"});
    } catch (err) {
      res.status(400).json({message:"Error in updating expenses" });
    }
  });
  
// ✅ Delete an expense by ID
router.delete('/delete_expensedetails/:id', async (req, res) => {
  try {
    const deletedExpense = await ExpenseDetail.findOneAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get an expense by ID
router.get('/expensedetails/:id', async (req, res) => {
  try {
    const expense = await ExpenseDetail.find(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message:"Error in retrieving expenses" });
  }
});

module.exports = router;
