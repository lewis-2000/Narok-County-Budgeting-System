const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    // id : mongoose.SchemaTypes.ObjectId,
    purpose : String,
    ward : String,
    ministry : String,
    amount : Number,
    paymentMethod : String,
    authorizedBy : String,
    dateOfTransfer : Date,
    percentageAllocation: Number,
    percentageAllocationSelect: String,
    educationDevelopment: Number,
    educationDevelopmentSelect: String,
    earlyChildhoodDevelopment: Number,
    earlyChildhoodDevelopmentSelect: String,
    tertiaryBursaries: Number,
    tertiaryBursariesSelect: String,
    nonTertiaryBursaries: Number,
    nonTertiaryBursariesSelect: String,
    orphanedAndVulnerableChildrenBursaries: Number,
    orphanedAndVulnerableChildrenBursariesSelect: String,
    totalAllocation: Number,
    totalAllocationSelect: String
});

module.exports = mongoose.model('transaction', transactionSchema);