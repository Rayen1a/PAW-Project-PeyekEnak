const genAI = require('../config/gemini');
const ProductModel = require('../models/ProductModel');

exports.generateChatResponse = async (userMessage) => {
    try {
        // 1. Ambil data dari database PostgreSQL
        const products = await ProductModel.getAllProducts();
        const katalogText = products.map(p => `- ${p.nama} (Varian: ${p.varian}) seharga Rp ${p.harga}`).join('\n');

        // 2. Gabungkan Aturan, Data, dan Pertanyaan User ke dalam satu Prompt utama
        const prompt = `
Anda adalah "Asisten Peyek Enak", AI chatbot ramah yang melayani pembeli UMKM Peyek Enak.

Ketersediaan Produk Saat Ini:
${katalogText}
        
ATURAN KETAT:
1. Jawab HANYA pertanyaan seputar produk Peyek Enak, harga, varian, dan cara pemesanan.
2. JIKA pengguna bertanya hal di luar konteks (contoh: minta dibuatkan kode program, game, resep masakan lain, cuaca, dll), TOLAK dengan sopan, jelaskan peran Anda, dan arahkan kembali ke katalog.
3. Jawablah dengan singkat, ramah, dan informatif.

Pertanyaan Pengguna: "${userMessage}"
`;

        // 3. Gunakan model dasar yang paling stabil
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

        const result = await model.generateContent(prompt);
        return result.response.text();
        
    } catch (error) {
        console.error("Gagal memanggil Gemini:", error.message);
        throw error; // Lempar error agar ditangkap oleh controller
    }
};