const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectWithDB = require('./config/db');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(express.json());
app.use(cookieParser());

connectWithDB();

app.use("", require('./routes'));

app.listen(PORT, (err) => {
    if(err)
       console.log("Error connecting to server" + err);
    else
       console.log('Listening on PORT:' + PORT);
})