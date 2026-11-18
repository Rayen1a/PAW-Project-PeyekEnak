const validateChatInput = (req, res, next) => {
    const { message } = req.body;
    if (!message || message.trim() === '') {
        return res.status(400).json({ success: false, error: 'Pesan tidak boleh kosong' });
    }
    if (message.length > 500) {
        return res.status(400).json({ success: false, error: 'Pesan terlalu panjang (maksimal 500 karakter)' });
    }
    next();
};

module.exports = validateChatInput;