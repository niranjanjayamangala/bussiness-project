const mongoose = require('mongoose');

const FarmerDetailSchema = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
      unique: true, // Ensures each farmer has a unique ID
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    farmSize: {
      type: Number, // Size in acres or hectares
      required: true,
    },
    crops: {
      type: [String], // Array of crops grown
      required: true,
    },
    dateJoined: {
      type: Date,
      default: Date.now, // Automatically sets to current date
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], // Status of the farmer
      default: 'active',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const FarmerDetail = mongoose.model('FarmerDetail', FarmerDetailSchema);
module.exports = FarmerDetail;