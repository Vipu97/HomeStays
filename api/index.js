import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectWithDB} from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/index.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());
app.use(cookieParser());

connectWithDB();

app.use("", router);

app.listen(PORT, (err) => {
    if(err)
       console.log("Error connecting to server" + err);
    else
       console.log('Listening on PORT:' + PORT);
})