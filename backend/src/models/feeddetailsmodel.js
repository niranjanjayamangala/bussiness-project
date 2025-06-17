const mongoose = require('mongoose');

const FeedDetailSchema = new mongoose.Schema(
  {
    feedId: {
      type: String,
      required: true,
      unique: true, // Ensures each feed has a unique ID
    },
    feedType: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    ingredients: {
      type: [String], // Array of ingredients in the feed
      required: true,
    },
    quantity: {
      type: Number, // Quantity available in kg or other units
      required: true,
    },
    supplier: {
      type: String,
      required: true,
      trim: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now, // Automatically sets to current date
    },
    status: {
      type: String,
      enum: ['available', 'out of stock'], // Status of the feed
      default: 'available',
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const FeedDetail = mongoose.model('FeedDetail', FeedDetailSchema);
module.exports = FeedDetail;