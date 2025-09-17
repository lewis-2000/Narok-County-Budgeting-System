const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const transaction = require('../db/transaction');

//Initialize mongoDB
const uri = "mongodb://localhost:27017/NarokBudgeting";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('\x1b[33mConnected to main server');
});


//endpoints for routes
// ... (other imports and setup code)

router.route('/')
  .get(function(req, res) {
    res.render('main', {title: 'Narok County Budgeting System'});
  })
  .post(async (req, res) => {
    // const formData = req.body; // Form data sent in the request body

    try {
      // Create a new document using the transaction schema
      const transactions = new transaction({
        purpose: req.body.purpose,
        ward: req.body.ward,
        ministry: req.body.ministry,
        paymentMethod: req.body.paymentMethod,
        authorizedBy: req.body.authorized,
        dateOfTransfer: req.body.dateOfTransfer,
        time: req.body.time,
        percentageAllocation: req.body.percentageAllocation,
        percentageAllocationSelect: req.body.percentageAllocationSelect,
        educationDevelopment: req.body.educationDevelopment,
        educationDevelopmentSelect: req.body.educationDevelopmentSelect,
        earlyChildhoodDevelopment: req.body.earlyChildhoodDevelopment,
        earlyChildhoodDevelopmentSelect: req.body.earlyChildhoodDevelopmentSelect,
        tertiaryBursaries: req.body.tertiaryBursaries,
        tertiaryBursariesSelect: req.body.tertiaryBursariesSelect,
        nonTertiaryBursaries: req.body.nonTertiaryBursaries,
        nonTertiaryBursariesSelect: req.body.nonTertiaryBursariesSelect,
        orphanedAndVulnerableChildrenBursaries: req.body.orphanedAndVulnerableChildrenBursaries,
        orphanedAndVulnerableChildrenBursariesSelect: req.body.orphanedAndVulnerableChildrenBursariesSelect,
        totalAllocation: req.body.totalAllocation,
        totalAllocationSelect: req.body.totalAllocationSelect
      });

    // const transactions = new transaction(formData);
    // console.log(transactions);

      // Save the document to MongoDB
      await transactions.save();

      // Send a response with a success status code
      res.sendStatus(201);
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// ... (other routes)

module.exports = router;


module.exports = router;
