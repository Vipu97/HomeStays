const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking')
const isLoggedIn = require('../middlewares/userAuth');

//route to create a new booking
router.post('/', isLoggedIn ,async (req,res) => {
    try{
        const userId = req.user.id;
        const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = req.body;
        const booking = await Booking.create({user:userId,place,checkIn,checkOut,numberOfGuests,name,price,phone});
        res.status(201).json(booking);
    }catch(err){
        res.status(500).json(err.message);
    }
});

//route to find all bookings of a particular user.
router.get('/account',isLoggedIn ,async (req,res) => {
    try{
        const userId = req.user.id;
        const bookings = await Booking.find({user:userId}).populate('place');
        res.status(200).json(bookings);
    }catch(e){
        res.status(500).json(e.message);
    }
});

//to get particular booking detail by user and place id.
router.get('/:placeId',isLoggedIn ,async (req,res) => {
    try{
        const {placeId} = req.params;
        const userId = req.user.id;
        const booking = await Booking.findOne({user:userId,place:placeId});
        res.status(200).json(booking);
    }catch(e){
        res.status(500).json(e.message);
    }
})

//route to delete a particular booking
router.delete('/',isLoggedIn,async (req,res) => {
    try{
        const {bookingId} = req.body;
        await Booking.findByIdAndDelete(bookingId);
        res.status(201).json('Booking Table Updated Successfully');
    }catch(err){
        res.status(500).json(e.message);
    }
})

module.exports = router;