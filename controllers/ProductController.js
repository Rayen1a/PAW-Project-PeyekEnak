const ProductModel = require('../models/ProductModel');

// Helper validasi harga (tidak boleh minus atau <= 0)
function isValidHarga(harga) {
    const num = Number(harga);
    return !isNaN(num) && num > 0;
}

// ================= API ENDPOINTS (CRUD) ================= //
exports.apiGetAll = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.json({ status: "success", data: products });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.apiGetById = async (req, res) => {
    try {
        const product = await ProductModel.getProductById(req.params.id);
        res.json({ status: "success", data: product });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.apiCreate = async (req, res) => {
    try {
        if (!isValidHarga(req.body.harga)) {
            return res.status(400).json({ error: "Harga harus berupa angka positif lebih dari 0 (tidak boleh minus)." });
        }
        const newProduct = await ProductModel.createProduct(req.body);
        res.status(201).json({ status: "success", data: newProduct });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.apiUpdate = async (req, res) => {
    try {
        if (!isValidHarga(req.body.harga)) {
            return res.status(400).json({ error: "Harga harus berupa angka positif lebih dari 0 (tidak boleh minus)." });
        }
        const updated = await ProductModel.updateProduct(req.params.id, req.body);
        res.json({ status: "success", data: updated });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.apiDelete = async (req, res) => {
    try {
        await ProductModel.deleteProduct(req.params.id);
        res.json({ status: "success", message: "Data berhasil dihapus" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// ================= WEB VIEWS (FRONTEND) ================= //
exports.showKatalog = async (req, res) => {
    const products = await ProductModel.getAllProducts();
    res.render('katalog', { products });
};

// 1. Tambah Produk
exports.formTambah = (req, res) => res.render('form-tambah', { error: null });

exports.prosesTambah = async (req, res) => {
    if (!isValidHarga(req.body.harga)) {
        return res.render('form-tambah', { error: "Harga tidak valid! Masukkan angka positif (contoh: 10000), tidak boleh minus." });
    }
    await ProductModel.createProduct(req.body);
    res.redirect('/katalog');
};

// 2. Edit / Update Produk
exports.formEdit = async (req, res) => {
    const product = await ProductModel.getProductById(req.params.id);
    if (!product) return res.redirect('/katalog');
    res.render('form-edit', { product, error: null });
};

exports.prosesEdit = async (req, res) => {
    if (!isValidHarga(req.body.harga)) {
        const product = await ProductModel.getProductById(req.params.id);
        return res.render('form-edit', { product, error: "Harga tidak valid! Masukkan angka positif (contoh: 10000), tidak boleh minus." });
    }
    await ProductModel.updateProduct(req.params.id, req.body);
    res.redirect('/katalog');
};

// 3. Hapus Produk
exports.prosesHapus = async (req, res) => {
    await ProductModel.deleteProduct(req.params.id);
    res.redirect('/katalog');
};

// 4. Detail Produk & Review Pembeli
exports.showDetailProduk = async (req, res) => {
    const product = await ProductModel.getProductById(req.params.id);
    if (!product) return res.redirect('/katalog');
    const reviews = await ProductModel.getReviewsByProductId(req.params.id);
    res.render('detail-produk', { product, reviews });
};

exports.prosesTambahReview = async (req, res) => {
    await ProductModel.addReview(req.params.id, req.body);
    res.redirect(`/katalog/detail/${req.params.id}`);
};