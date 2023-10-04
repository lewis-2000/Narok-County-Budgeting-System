const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../db/user');

//Initialize mongoDB
const uri = "mongodb://localhost:27017/NarokBudgeting";

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
 */


//endpoints for routes
router.route('/')
    .get(function(req, res) {
        res.render('home');
    })
    .post(async(req, res)=> {
        // const { username, password } = req.body;
        const user = new User({ name: req.body.username, password: req.body.password });
        await user.save().then(console.log('\x1b[33mSaved User'));
        closedb();
        res.render('main');

    });


module.exports = router;
