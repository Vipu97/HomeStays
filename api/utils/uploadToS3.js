import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import {configDotenv} from "dotenv";

configDotenv();
const bucket = process.env.BUCKET_NAME;

import fs from "fs";

export const uploadToS3 = async (path,originalFileName,mimetype) => {
    const client = new S3Client({
        region:'ap-south-1',
        credentials:{
            accessKeyId:process.env.S3_ACCESS_KEY,
            secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
        },
    })
    const parts = originalFileName.split('.');
    const ext = parts[parts.length - 1];
    const newFileName = Date.now() + '.' + ext;
    try{
        await client.send(new PutObjectCommand({
            Bucket:bucket,
            Body:fs.readFileSync(path),
            Key:newFileName,
            ContentType:mimetype,
            ACL:'public-read'
        }))
        return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    }catch(err){
        console.log(err);
        throw err;
    }
}
