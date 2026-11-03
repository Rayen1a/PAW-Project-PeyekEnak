const express = require('express');
const router = express.Router();
const WebController = require('../controllers/WebController');
const ProductController = require('../controllers/ProductController');

router.get('/', WebController.showHome);
router.get('/katalog', ProductController.showKatalog);
router.get('/gallery', WebController.showGallery);

module.exports = router;