const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    password: {
        type: String
    },
    hair: String
});

module.exports = mongoose.model('user', userSchema);