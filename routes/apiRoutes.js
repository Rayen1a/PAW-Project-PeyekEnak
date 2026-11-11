const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Endpoint API CRUD sesuai instruksi
router.get('/produk', ProductController.apiGetAll);
router.get('/produk/:id', ProductController.apiGetById);
router.post('/produk', ProductController.apiCreate);
router.put('/produk/:id', ProductController.apiUpdate);
router.delete('/produk/:id', ProductController.apiDelete);

module.exports = router;