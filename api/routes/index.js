const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const placeController = require('../controllers/placeController');
const bookingController = require('../controllers/bookingController');
const Place = require('../models/Place');
const imageDownload = require('image-downloader');
const multer = require('multer')
const mime = require('mime-types');
const uploadToS3 = require('../utils/uploadToS3');

router.use('/user',userController);
router.use('/place',placeController);
router.use('/booking',bookingController);

const photosMiddleware = multer({dest:'/tmp'});

//route to get all places for index page
router.get('/places',async (req,res) => {
    try{
        const allPlaces = await Place.find();
        res.json(allPlaces);
    }catch(err){
        res.json(err.message);
    }
})

router.post('/upload', photosMiddleware.array('photos',50) ,async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname,mimetype } = req.files[i];
        const url = await uploadToS3(path,originalname,mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles)
})

router.post('/upload_by_link', async (req,res) => {
    try{
        const {imgLink} = req.body;
        const newName = 'photo' + Date.now() + '.jpg';
        await imageDownload.image({
          url: imgLink,
          dest: '/tmp/' + newName,
        });
        const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' +newName));
        res.json(url);
    }catch(err){
        res.json(err);
    }
});

module.exports = router;