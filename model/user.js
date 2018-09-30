const mongoose = require('mongoose');

const user = new mongoose.Schema({
    avatar: String,
    username: String,
    email: {
        type: String,
        unique: true,
        required:true
    },
    password:String,
    dsc:String
}, {versionKey: false,timestamps:{createdAt: 'createdTime',updatedAt: 'updateTime'}});

module.exports = mongoose.model('user', user);





