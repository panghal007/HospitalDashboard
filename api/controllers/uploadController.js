// controllers/uploadController.js

const fs = require('fs');

// Handle file upload
const uploadImage = async (req, res) => {
  try {
    console.log(req.body);
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    // Process the uploaded file, such as saving it to the server or database
    console.log('Image uploaded:', file.originalname);
    return res.status(200).send('Image uploaded successfully.');
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  uploadImage
};
