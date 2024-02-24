const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Place = require('./models/Place')
const cookieParser = require('cookie-parser');
const imageDownload = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
const bookingController = require('./controllers/bookingController');

const app = express()
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/user',userController);
app.use('/place',placeController);
app.use('/booking',bookingController);

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173/'];

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.listen('4000', (req, res) => {
    console.log('Listening on Port:4000')
})


//route to get all places for index page
app.get('/places',async (req,res) => {
    try{
        const allPlaces = await Place.find();
        res.json(allPlaces);
    }catch(err){
        res.json(err.message);
    }
})
app.post('/upload_by_link', async (req, res) => {
    try {
        const { imgLink } = req.body;
        const newName = 'airbnb' + Date.now() + '.jpg';
        const options = {
            url: imgLink,
            dest: __dirname + '\\uploads\\' + newName,
        }
        await imageDownload.image(options);
        res.json(newName)
    } catch (err) {
        res.status(404).send('Failed to upload Image');
        console.log(err);
    }
})

const photosMiddleware = multer({ dest: 'uploads/' })

app.post('/upload', photosMiddleware.array('photos', 50), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFiles)
})

