const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    owner : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
    maxGuests : Number,
    price : Number,
    bookedDates : [String],
})

const Place = mongoose.model('Place',placeSchema);

module.exports = Place;
