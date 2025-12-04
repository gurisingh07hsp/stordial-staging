const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const upload = multer({ dest: "uploads/" });


router.post('/', upload.array("files"), async(req,res) => {
    try {
    const uploadPromises = req.files.map(file => {
      return cloudinary.uploader.upload(file.path, {
        folder: "stordial"
      }).then(result => {
        // delete file from local uploads folder after upload
        fs.unlinkSync(file.path);
        return result;
      });
    });

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      files: results.map(r => ({
        url: r.secure_url,
        public_id: r.public_id
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/delete', async(req,res) => {
  try{
    const {id} = req.body;
    console.log("public id : ",id);
    cloudinary.uploader.destroy(id, (error, result) => {
    // console.log(result, error);
    });
      res.json({
      success: true,
      message: "Image Deleted Successfully"
    });
  }catch(error){
    res.status(500).json({ success: false, error: error.message });
  }
})

module.exports = router;