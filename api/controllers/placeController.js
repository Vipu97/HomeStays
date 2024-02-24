const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const jwt = require('jsonwebtoken');
const jwtSecret = "VipinKiroula";
const cors = require('cors');
const bcrypt = require('bcryptjs');
const allDaysBetweenIntervals = require('../utils/allDays');

router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

//route to add place
router.post('/', async (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, maxGuests, extraInfo,price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
        if (err)
            throw err;
        const newPlace = await Place.create({ owner: userdata.id, title, address, photos: addedPhotos, description, perks, extraInfo, maxGuests,price});
        res.json(newPlace);
    })
})

//route to update existing place.
router.put('/', async (req, res) => {
    try{
        const { token } = req.cookies;
        const { id,title, address, addedPhotos, description, perks, maxGuests, extraInfo,price } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
            if (err)
                throw err;
            const place = await Place.findById(id);
            place.set({title, address, photos : addedPhotos, description, perks, maxGuests,extraInfo,price});
            await place.save();
            res.json(place);
        })
    }catch(err){
        res.status(400).json(err.message);
    }

})

//route to add booked dates in place collection
router.put('/:id', async (req,res) => {
    try{
        const {checkIn,checkOut} = req.body;
        const {id} = req.params;
        const allDates = allDaysBetweenIntervals(checkIn,checkOut);
        await Place.updateOne({_id : id} , {$push : {bookedDates : {$each : allDates }}});
        res.json("Place Updated SuccessFully!!")
    }catch(e){
        res.json(e.message);
    }
})

//route to delete booked dates in place collection
router.delete('/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const {checkIn,checkOut} = req.body;
        const allDates = allDaysBetweenIntervals(checkIn,checkOut);
        const {bookedDates} = await Place.findById(id);
        const newBookedDates = bookedDates.filter(date => !allDates.includes(date))
        await Place.findByIdAndUpdate(id,{bookedDates : newBookedDates});
        res.json("Booked Dates Successfully deleted")
    }catch(err){
        res.json(err.message);
    }
})

//route to get all the added places by the user
router.get('/account', async (req, res) => {
    try{
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
            const { id } = userdata;
            const myPlaces = await Place.find({ owner: id });
            res.json(myPlaces);
        })
    }catch(err){
        res.json(err.message);
    }
})

//route to delete a place added by user
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await Place.findByIdAndDelete(id);
        res.json("Place Successfull Deleted");
    }catch(err){
        console.log(err.message);
    }
})

//route to fetch all details of a particular place.
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const place = await Place.findById(id);
        res.json(place);
    }catch(e){
        console.log(e.message);
    }
})

module.exports = router;