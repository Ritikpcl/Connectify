import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    // console.log(uploadedImage.url)
    res.status(200).json({ imgUrl : uploadedImage.url});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router

