const ProductModel = require('../models/ProductModel');

// Untuk Endpoint API JSON
exports.getApiStatus = (req, res) => {
    res.json({ status: "success", message: "Server berjalan dengan baik", code: 200 });
};

exports.getApiProducts = (req, res) => {
    const products = ProductModel.getAllProducts();
    res.json({ status: "success", data: products });
};

// Untuk View Halaman EJS
exports.showKatalog = (req, res) => {
    const products = ProductModel.getAllProducts();
    res.render('katalog', { products });
};