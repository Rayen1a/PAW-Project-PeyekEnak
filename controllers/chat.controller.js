const geminiService = require('../services/gemini.service');

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const reply = await geminiService.generateChatResponse(message);
        
        // Respons sesuai format yang diinstruksikan
        res.json({
            success: true,
            data: {
                reply: reply
            }
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, error: "Layanan asisten AI sedang sibuk atau bermasalah." });
    }
};