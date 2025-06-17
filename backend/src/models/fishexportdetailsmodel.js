const mongoose = require('mongoose');

const FishExportDetailSchema = new mongoose.Schema(
  {
    exportId: {
      type: String,
      required: true,
      unique: true, // Ensures each export has a unique ID
    },
    fishType: {
      type: [String],
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    Trys:{
      type:String,
      reduired:true,
      trim:true
    },
    quantity: {
      type: Number, // Quantity of fish being exported (in kg or number of fish)
      required: true,
    },
    fishnumber:{
      type:Number,
      required:true
    },
    fishaverage:{
      type:String,
      required:true
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    exportDate: {
      type: Date,
      required: true,
    },
    exporterName: {
      type: String,
      required: true,
      trim: true,
    },
    documentation: {
      type: String, // Any relevant documentation (e.g., export permits)
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'canceled'], // Status of the export
      default: 'pending',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const FishExportDetail = mongoose.model('FishExportDetail', FishExportDetailSchema);
module.exports = FishExportDetail;