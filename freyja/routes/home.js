const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../db/user');
const { MongoClient } = require("mongodb");


//Initialize mongoDB
const uri = "mongodb://localhost:27017/NarokBudgeting";
const url = "mongodb://localhost:27017";

const dbName = "NarokBudgeting";
const collectionName = "users";



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


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to authentication server');
});

function closedb() {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
    });
}


//db functions
async function putuser() {
    const user = new User({ name: 'Lewis', age: 42, hair: 'blue' });
    user.save().then(console.log('\x1b[33mSaved User'));
}



async function deleteuser() {
    const user = await findOne({ name: 'Mungai' });
    user.deleteOne().then(console.log('\x1b[33mRemoved User'));
}

async function updateuser() {
    const user = await findOne({ name: 'Mungai' });
    user.age = 45;
    user.save().then(console.log('\x1b[33mUpdated User'));
}



//Swagger endpoints

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Get an example resource
 *     responses:
 *       200:
 *         description: Successfully retrieved the resource
 * 
 *       500:
 *          description: Failure to retrieve the resource
 */


//endpoints for routes
router.route('/')
    .get(function(req, res) {
        res.render('home');
    })
    .post(async(req, res)=> {
        // const { username, password } = req.body;
        // const user = new User({ name: req.body.username, password: req.body.password });
        // await user.save().then(console.log('\x1b[33mSaved User'));
        
        const data = await retrieveData(); // Retrieve data asynchronously
        const searchDataUsername = req.body.username; // Get the username from the form
        const searchDataPassword = req.body.password; // Get the password from the form

        // Use a filter function to find documents that match the search query
        const filteredData = data.filter(item => {
        // Check if both item.username and item.password exist and are strings
        if (typeof item.username === 'string' && typeof item.password === 'string') {
            // You can modify this logic to match your specific search requirements
            return (
            item.username.includes(searchDataUsername) && // Check if username includes the search query
            item.password.includes(searchDataPassword)  // Check if password includes the search query
            );
        }
        return false; // Return false for items that don't meet the criteria
        });

        if (filteredData.length > 0) {
        res.render('main', { filteredData });
        } else {
        res.render('home');
        }                

    });


module.exports = router;
