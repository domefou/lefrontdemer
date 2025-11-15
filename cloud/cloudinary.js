import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_NAME,
    api_key: process.env.cloud_KEY,
    api_secret: process.env.cloud_SECRET,
});

export default cloudinary;
