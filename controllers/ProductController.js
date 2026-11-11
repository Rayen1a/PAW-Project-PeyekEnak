const ProductModel = require('../models/ProductModel');

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
        const newProduct = await ProductModel.createProduct(req.body);
        res.status(201).json({ status: "success", data: newProduct });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.apiUpdate = async (req, res) => {
    try {
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

// Fungsi tambahan untuk form UI Web (Create & Update)
exports.formTambah = (req, res) => res.render('form-tambah');

exports.prosesTambah = async (req, res) => {
    await ProductModel.createProduct(req.body);
    res.redirect('/katalog');
};

exports.prosesHapus = async (req, res) => {
    await ProductModel.deleteProduct(req.params.id);
    res.redirect('/katalog');
};