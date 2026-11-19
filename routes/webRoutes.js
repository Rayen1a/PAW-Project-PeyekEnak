const express = require('express');
const router = express.Router();
const WebController = require('../controllers/WebController');
const ProductController = require('../controllers/ProductController');

router.get('/', WebController.showHome);

// CRUD Katalog
router.get('/katalog', ProductController.showKatalog);
router.get('/katalog/tambah', ProductController.formTambah);
router.post('/katalog/tambah', ProductController.prosesTambah);

// Rute Update (Edit)
router.get('/katalog/edit/:id', ProductController.formEdit);
router.post('/katalog/edit/:id', ProductController.prosesEdit);

// Rute Delete
router.post('/katalog/hapus/:id', ProductController.prosesHapus);

// Rute Detail & Review Produk
router.get('/katalog/detail/:id', ProductController.showDetailProduk);
router.post('/katalog/detail/:id/review', ProductController.prosesTambahReview);

// Chatbot AI
router.get('/chat', (req, res) => res.render('chat'));

module.exports = router;