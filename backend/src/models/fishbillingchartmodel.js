const mongoose = require('mongoose');

const FishChartBIllingDetailSchema = new mongoose.Schema(
  {
    fishchartId:{
         type: String,
      required: true,
      unique: true, // Ensures each farmer has a unique ID
    },
    SNo:{
        type:String,
        required:true
    },
     date: {
      type: Date,
      default: Date.now
     },
     fishVariety:{
        type: [String],
      required: true,
      trim: true,
     },
     Trys:{
        type: [String],
      required: true,
     },
     Kgs:{
        type: [String],
      required: true,
     },
     pieces:{
        type: [String],
      required: true,
      
     },
     Average:{
        type: [String],
      required: true,
      
     },
     totalKgs:
     {
         type: String,
      required: true,
      trim: true,
    },
     totalTonnage:{
         type: [String],
      required: true,
      trim: true,
    },
     
    Rate:{
        type:Number,
        required:true,

    },
    Amount:{
        type:String,
        required:true
    },
    grandTotalAmount:{
        type:String,
        required:true
    },
    Advance:
    {
        type:[String],
        required:true
    },
    comm:{
        type:String,
        required:true

    },
    others:{
        type:[String],
        required:true
    },
    payments:{
        type:[String],
        required:true
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'cash', 'debit card', 'bank transfer', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'paid'
    },
},
{ timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const FishBillingChartDetail = mongoose.model('FishBillingChartDetail', FishChartBIllingDetailSchema);
module.exports = FishBillingChartDetail;