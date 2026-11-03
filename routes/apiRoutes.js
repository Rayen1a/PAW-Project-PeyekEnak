const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/status', ProductController.getApiStatus);
router.get('/produk', ProductController.getApiProducts);

module.exports = router;