import cloudinary from 'cloudinary';
import fs from 'fs';

const { v2: cloudinaryV2 } = cloudinary;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;
        const resp = await cloudinaryV2.uploader.upload(localFile, {
            resource_type: 'auto',
        });
   
        return resp;
    } catch (err) {
        fs.unlinkSync(localFile);
        throw err; 
    }
};

export default uploadCloudinary;
