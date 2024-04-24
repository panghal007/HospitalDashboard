// routes/hospitalRoutes.js

const express = require('express');
const router = express.Router();

const hospitalController = require('../controllers/hospitalController');
const uploadController = require('../controllers/uploadController');


router.post('/register', hospitalController.registerHospital);
router.post('/login', hospitalController.loginHospital);
// router.put('/:id', hospitalController.updateHospital);
router.post('/upload',  uploadController.uploadImage);
module.exports = router;
