import { v2 as cloudinary } from 'cloudinary';

// Configuration get these variables from cloudinary https://cloudinary.com/users/register_free

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


export default cloudinary 
