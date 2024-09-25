const express = require('express');
const path = require('path');
const cityRoutes = require('./routes/cityRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4001;

// Enable CORS for all routes
app.use(cors());  

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Use the routes defined in cityRoutes.js
app.use(cityRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
