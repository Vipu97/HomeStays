const mongoose = require('mongoose')

// require('dotenv').config();
// mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String
})

const User = mongoose.model('User',userSchema);

module.exports = User;