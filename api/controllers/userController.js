const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = "VipinKiroula";
const cors = require('cors');
const bcrypt = require('bcryptjs');

const bcryptSalt = bcrypt.genSaltSync(10);

router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

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
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const passOk = bcrypt.compareSync(password, user.password);
            if (passOk) {
                jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
                    if (err)
                        throw err;
                    res.cookie('token', token).json(user);
                });
            }
            else
                res.status(422).json("Wrong Password");
        }
        else
            res.status(404).json('User not Found');
    } catch (e) {
        console.log("Eror while finding user", e);
    }
});

//route to hadle logout of user
router.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})

//route to get data for user profile
router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err)
                throw err;
            res.json(user);
        })
    }
    else
        res.json(null);
})

//routes to get users all the data.
router.get('/', async (req,res) => {
    try{
        const {token} = req.cookies;
        jwt.verify(token,jwtSecret,{},async (err,userData) => {
            if(err)  throw err;
            const user = await User.findById(userData.id);
            res.json(user)
        })
    }catch(err){
        res.json(err.message)
    }
})
//route to update user bookings and bookedPlaces data on a booking.
router.put('/bookings', async (req,res) => {
    try{
        const {bookingId,userId,bookedPlace} = req.body;
        const {bookings,bookedPlaces} = await User.findById(userId);
        const updatedAttributes = {
            bookings : [...bookings,bookingId],
            bookedPlaces : [...bookedPlaces,bookedPlace]
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{$set : updatedAttributes})
        res.json(updatedUser);
    }catch(err){
        res.json(err.message);
    }
})
//routes to delete any booking details from the user 
router.delete('/bookings', async(req,res) => {
    try{
        const {token} = req.cookies;
        const {placeId,bookingId} = req.body;
        jwt.verify(token, jwtSecret, {}, async(err,userData) => {
            if(err)
               throw err;
            const {bookedPlaces,bookings} = await User.findById(userData.id);
            const updatedBookedPlaces = bookedPlaces.filter(id => id.toString() !== placeId);
            const updatedBookings = bookings.filter(id => id.toString() !== bookingId);
            await User.findByIdAndUpdate(userData.id , {$set : {bookedPlaces : updatedBookedPlaces , bookings : updatedBookings}})
            res.json("User Bookings Update Successfully");
        })
    }catch(e){
        console.log(e.message);
    }
})

module.exports = router;