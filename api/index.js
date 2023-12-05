const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Place = require('./models/Place')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownload = require('image-downloader');
const multer = require('multer');
const fs = require('fs')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "shflhawslfaasfjf";

const app = express()
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

const db = mongoose.connection;
app.listen('4000', (req, res) => {
    console.log('Listening on Port:4000')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(newUser)
    } catch (e) {
        res.status(422).json(e.message);
    }
})

app.post('/login', async (req, res) => {
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
                res.status(422).json("pass not Ok");
        }
        else
            console.log('User not Found');
    } catch (e) {
        console.log("Eror while finding user", e);
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err)
                throw err;
            res.json(user);
        })
    }
    else
        res.json(null)
})
app.post('/upload_by_link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownload.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})

const photosMiddleware = multer({ dest: 'uploads/' })

app.post('/upload', photosMiddleware.array('photos', 50), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        console.log(path)
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFiles)
})

app.post('/places', async (req, res) => {
    const {token} = req.cookies;
    const { title, address, addedPhotos, description, perks, checkIn, checkOut, maxGuests, extraInfo } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err,userdata) => {
        if(err)
          throw err;
    })
    const newPlace = await Place.create({title, address, photos: addedPhotos, description, perks, 
        additionalInfo: extraInfo,checkIn,checkOut,maxGuests})
    res.json('New Place Created')
})