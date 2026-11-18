require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const chatRoutes = require('./routes/chat.routes');

// Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware bawaan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implementasi Middleware Logger sesuai instruksi
app.use(logger);

// Routing
app.use('/api', apiRoutes);
app.use('/', webRoutes);
app.use('/api', chatRoutes); // Menghasilkan endpoint POST /api/chat

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});