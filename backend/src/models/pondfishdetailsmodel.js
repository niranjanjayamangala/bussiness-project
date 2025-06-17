const mongoose = require('mongoose');

const PondFishDetailSchema = new mongoose.Schema(
  {
    fishId: {
      type: String,
      required: true,
    },
    species: {
      type:[String],
      required: true,
      trim: true, 
    },
    quantity: {
      type: [String], 
      required: true,
    },
    pondLocation: {
      type: [String],
      required: true,
      trim: true,
    },
    feedingSchedule: {
      type: [String], 
      required: true,
      trim: true,
    },
    
    dateStocked: {
      type: Date,
      required: true,
    },
    others:{
      type:[String],
      required:true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], 
      default: 'active',
    },
  },
   {timestamps: true} 
);

const PondFishDetail = mongoose.model('PondFishDetail', PondFishDetailSchema);
module.exports = PondFishDetail;