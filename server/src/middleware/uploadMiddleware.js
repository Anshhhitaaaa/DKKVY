
// src/middleware/uploadMiddleware.js
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
