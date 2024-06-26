import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn = async (req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"You are not Logged In!!",
            })
        }
        jwt.verify(token,jwtSecret,{},async (err,user) => {
            if(err)
               return res.status(401).json({message : "Unauthorized"});
            req.user = user;
            next();
        })
    }catch(err){
        console.error(err);
        res.json(500).json("Internal Server Error");
    }
}
