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
    const { nama, varian, harga, gambar } = data;
    const result = await db.query(
        'INSERT INTO products (nama, varian, harga, gambar) VALUES ($1, $2, $3, $4) RETURNING *',
        [nama, varian, harga, gambar]
    );
    return result.rows[0];
};

exports.updateProduct = async (id, data) => {
    const { nama, varian, harga, gambar } = data;
    const result = await db.query(
        'UPDATE products SET nama=$1, varian=$2, harga=$3, gambar=$4 WHERE id=$5 RETURNING *',
        [nama, varian, harga, gambar, id]
    );
    return result.rows[0];
};

exports.deleteProduct = async (id) => {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
};