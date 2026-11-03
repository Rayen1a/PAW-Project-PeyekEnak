const products = [
    { id: 1, nama: "Peyek Kacang", varian: "Original", harga: 15000, gambar: "kacang.jpg" },
    { id: 2, nama: "Peyek Teri", varian: "Pedas", harga: 17000, gambar: "teri.jpg" },
    { id: 3, nama: "Peyek Rebon", varian: "Original", harga: 16000, gambar: "rebon.jpg" }
];

exports.getAllProducts = () => products;
exports.getProductById = (id) => products.find(p => p.id === parseInt(id));