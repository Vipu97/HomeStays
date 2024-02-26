const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const allDaysBetweenIntervals = require('../utils/allDays');
const isLoggedIn = require('../middlewares/userAuth');

//route to add place
router.post('/', isLoggedIn, async (req, res) => {
    try{
        const userId = req.user.id;
        const { title, address, addedPhotos, description, perks, maxGuests, extraInfo,price } = req.body;
        const newPlace = await Place.create({ owner: userId,title, address, photos: addedPhotos, description, perks, extraInfo, maxGuests,price});
        res.status(201).json(newPlace);
    }catch(err){
        res.status(500).json(e.message);
    }
})

//route to update existing place.
router.put('/', isLoggedIn,async (req, res) => {
    try{
        const { id,title, address, addedPhotos, description, perks, maxGuests, extraInfo,price } = req.body;
        const place = await Place.findById(id);
        place.set({title, address, photos : addedPhotos, description, perks, maxGuests,extraInfo,price});
        await place.save();
        res.status(201).json("Place Update Successfully");
    }catch(err){
        res.status(500).json(err.message);
    }

})

//route to add booked dates in place collection
router.put('/:id', isLoggedIn, async (req,res) => {
    try{
        const {checkIn,checkOut} = req.body;
        const {id} = req.params;
        const allDates = allDaysBetweenIntervals(checkIn,checkOut);
        await Place.updateOne({_id : id} , {$push : {bookedDates : {$each : allDates }}});
        res.status(201).json("Place Updated SuccessFully!!")
    }catch(e){
        res.status(500).json(e.message);
    }
})

//route to delete booked dates in place collection
router.delete('/:id',isLoggedIn,async(req,res) => {
    try{
        const {id} = req.params;
        const {checkIn,checkOut} = req.body;
        const allDates = allDaysBetweenIntervals(checkIn,checkOut);
        const {bookedDates} = await Place.findById(id);
        const newBookedDates = bookedDates.filter(date => !allDates.includes(date))
        await Place.findByIdAndUpdate(id,{bookedDates : newBookedDates});
        res.status(200).json("Booked Dates Successfully deleted")
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to get all the added places by the user
router.get('/account', isLoggedIn ,async (req, res) => {
    try{
        const userId = req.user.id;
        const myPlaces = await Place.find({ owner: userId });
        res.status(200).json(myPlaces);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to delete a place added by user
router.delete('/', isLoggedIn, async (req, res) => {
    try{
        const { placeId } = req.body;
        await Place.findByIdAndDelete(placeId);
        res.status(200).json("Place Successfull Deleted");
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to fetch all details of a particular place.
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const place = await Place.findById(id);
        res.status(200).json(place);
    }catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;