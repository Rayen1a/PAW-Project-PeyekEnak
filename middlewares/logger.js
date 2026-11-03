const logger = (req, res, next) => {
    // Menunggu response selesai agar status code akurat
    res.on('finish', () => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });
    next();
};

module.exports = logger;