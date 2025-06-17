const mongoose = require('mongoose');

const LabourPageDetailSchema = new mongoose.Schema({
    labourId: {
        type: String,
        required: true,
        unique: true, 
    },
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    role: {
        type: String,
        required: true,
        trim: true, 
    },
    salary: {
        type: String,
        required: true,
        trim: true,
    },
    salarycredit: {
        type: String,
        required: true,
    },
    totalPayment: {
        type: Number, 
        required: true,
    },
    dateOfWork: {
        type: Date,
        required: true,
    },
    iceCans: {
        type: Number,
        required: true,
    },
    husk: {
        type: String,
        required: true,
    },
    VehicleAdvance:{
        type:String,
        required:true
    },
    transportCharges: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], 
        default: 'active',
    }
}, { timestamps: true }); // Corrected placement of parentheses

const LaborPageDetail = mongoose.model('LabourPageDetail', LabourPageDetailSchema);
module.exports = LaborPageDetail;