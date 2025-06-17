const mongoose = require('mongoose');

const ExpenseDetailSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: [String],
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'cash', 'debit card', 'bank transfer', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'paid',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const ExpenseDetail = mongoose.model('ExpenseDetail', ExpenseDetailSchema);
module.exports = ExpenseDetail;