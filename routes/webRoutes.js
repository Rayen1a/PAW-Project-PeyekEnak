const express = require('express');
const router = express.Router();
const WebController = require('../controllers/WebController');
const ProductController = require('../controllers/ProductController');

router.get('/', WebController.showHome);
// Rute CRUD Frontend
router.get('/katalog', ProductController.showKatalog);
router.get('/katalog/tambah', ProductController.formTambah);
router.post('/katalog/tambah', ProductController.prosesTambah);
router.post('/katalog/hapus/:id', ProductController.prosesHapus); // Pakai POST krn form HTML native tdk dukung DELETE

module.exports = router;