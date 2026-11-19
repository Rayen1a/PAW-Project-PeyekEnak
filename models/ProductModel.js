const db = require('../config/database');

exports.getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products ORDER BY id ASC');
    return result.rows;
};

exports.getProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createProduct = async (data) => {
    const { nama, varian, harga, gambar, deskripsi } = data;
    const result = await db.query(
        'INSERT INTO products (nama, varian, harga, gambar, deskripsi) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nama, varian, parseInt(harga), gambar || 'default.jpg', deskripsi]
    );
    return result.rows[0];
};

exports.updateProduct = async (id, data) => {
    const { nama, varian, harga, gambar, deskripsi } = data;
    const result = await db.query(
        'UPDATE products SET nama=$1, varian=$2, harga=$3, gambar=$4, deskripsi=$5 WHERE id=$6 RETURNING *',
        [nama, varian, parseInt(harga), gambar || 'default.jpg', deskripsi, id]
    );
    return result.rows[0];
};

exports.deleteProduct = async (id) => {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
};

// === FUNGSI REVIEW PRODUK ===
exports.getReviewsByProductId = async (productId) => {
    const result = await db.query(
        'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
        [productId]
    );
    return result.rows;
};

exports.addReview = async (productId, data) => {
    const { nama_pembeli, rating, komentar } = data;
    const result = await db.query(
        'INSERT INTO reviews (product_id, nama_pembeli, rating, komentar) VALUES ($1, $2, $3, $4) RETURNING *',
        [productId, nama_pembeli, parseInt(rating), komentar]
    );
    return result.rows[0];
};