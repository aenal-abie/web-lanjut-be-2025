const serverRoutes = require('./routes/serverRoutes.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', serverRoutes);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
