const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    bookings : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Bookings',
    },
    bookedPlaces : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Place',
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;