const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking')
const jwt = require('jsonwebtoken');
const jwtSecret = "VipinKiroula";
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

//route to create a new booking
router.post('/',async (req,res) => {
    try{
        const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = req.body;
        const {token} = req.cookies;
        jwt.verify(token,jwtSecret,{},async (err,userData) => {
            if(err)
              throw err;
            const booking = await Booking.create({user:userData.id,place,checkIn,checkOut,numberOfGuests,name,price,phone});
            res.json(booking);
        });
    }catch(err){
        res.json(err.message);
    }
});

//route to find all bookings of a particular user.
router.get('/account',async (req,res) => {
    try{
        const {token} = req.cookies;
        jwt.verify(token,jwtSecret,{}, async(err,userData) => {
            if(err)
              throw err;
            const {id} = userData;
            const bookings = await Booking.find({user:id}).populate('place');
            res.json(bookings);
        })
    }catch(e){
        res.json(e.message);
    }
});

//to get particular booking detail by user and place id.
router.get('/:placeId',async (req,res) => {
    try{
        const {token} = req.cookies;
        const {placeId} = req.params;
        jwt.verify(token,jwtSecret,{},async (err,userData) => {
            if(err)
               throw err;
            const {id} = userData;
            const booking = await Booking.findOne({user:id,place:placeId});
            res.json(booking);
        })
    }catch(e){
        res.json(e.message);
    }
})

//route to delete a particular booking
router.delete('/',async (req,res) => {
    try{
        const {bookingId} = req.body;
        await Booking.findByIdAndDelete(bookingId);
        res.json('Booking Table Updated Successfully');
    }catch(e){
        console.log(e.message);
    }
})

module.exports = router;