const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middlewares/userAuth');

const bcryptSalt = bcrypt.genSaltSync(10);


//route to handle new registration for user.
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(newUser)
    } catch (e) {
        res.status(422).json(e);
    }
})

//route to handle user login
router.post('/login',async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)
           return res.status(404).json("User Not Exist");
        const passOk =  bcrypt.compareSync(password, user.password);
        if(!passOk)
           return res.status(422).json("Wrong Password");
        jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {expiresIn : '24h'} , (err, token) => {
            if (err)
                throw err;
            res.cookie('token', token).json(user);
        });
    }catch(err){
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });
    }
})
//route to hadle logout of user
router.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})


//route to update user name or password
router.put('/',isLoggedIn,async(req,res) => {
    try{
        const {newName,newPassword} = req.body;
        const userId = req.user.id;
        const newAttributes = {
            name : newName,
            password : bcrypt.hashSync(newPassword, bcryptSalt)
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{$set : newAttributes});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to get users full data.
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message, // Include the error message in the response
        });
    }
});

//route to get data for user profile
router.get('/profile', isLoggedIn , (req,res) =>{
    res.json(req.user);
})

//route to update add bookings and bookedPlaces data inside user on a booking.
router.put('/bookings', isLoggedIn , async (req,res) => {
    try{
        const {bookingId,bookedPlace} = req.body;
        const userId = req.user.id;
        const {bookings,bookedPlaces} = await User.findById(userId);
        const updatedAttributes = {
            bookings : [...bookings,bookingId],
            bookedPlaces : [...bookedPlaces,bookedPlace]
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{$set : updatedAttributes});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err.message);
    }
})
//routes to delete any booking details from the user 
router.delete('/bookings', isLoggedIn, async(req,res) => {
    try{
        const {placeId,bookingId} = req.body;
        const userId = req.user.id;
        const {bookedPlaces,bookings} = await User.findById(userId);
        const updatedBookedPlaces = bookedPlaces.filter(id => id.toString() !== placeId);
        const updatedBookings = bookings.filter(id => id.toString() !== bookingId);
        await User.findByIdAndUpdate(userId , {$set : {bookedPlaces : updatedBookedPlaces , bookings : updatedBookings}})
        res.status(200).json("User Bookings Update Successfully");
    }catch(e){
        res.status(500).json(e.message);
    }
})

module.exports = router;