const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/NarokBudgeting";
const url = "mongodb://localhost:27017";
const dbName = "NarokBudgeting";
const collectionName = "transactions";

const client = new MongoClient(url);

async function retrieveData() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    return documents; // Return the retrieved data
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

async function fetchUsers() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const documents = await collection.find({}).toArray();
    return documents; // Return the retrieved data
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

router.route('/')
  .get(async (req, res) => {
    try {
      const searchData = req.query.search; // Retrieve the search query from the URL query parameters

      const data = await retrieveData(); // Retrieve data asynchronously
      const users = await fetchUsers(); // Retrieve users asynchronously

      if (searchData) {
        // Use a filter function to find documents that match the search query
        data = data.filter(item => {
          // You can modify this logic to match your specific search requirements
          return (
            item.purpose.includes(searchData) || // Check if purpose1 includes the search query
            item.purpose.includes(searchData) || // Check if purpose2 includes the search query
            item.ministry.includes(searchData) ||
            // Add more fields to search as needed
            item.amount.includes(searchData) ||
            item.paymentMethod.includes(searchData) ||
            item.authorizedBy.includes(searchData) ||
            item.date.includes(searchData) ||
            item.time.includes(searchData)
          );
        });
      }

      res.render('admin', { data, users, searchQuery: searchData  });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
  })
  .post((req, res) => {
    // Handle POST requests
  })
  .patch((req, res) => {
    // Handle PATCH requests
  })
  .delete((req, res) => {
    // Handle DELETE requests
  });

module.exports = router;
