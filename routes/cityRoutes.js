const express = require('express');
const cityController = require('../controllers/cityController');
const router = express.Router();

// Define the route for fetching city data
router.get('/api/cities', (req, res, next) => {
    next();  // Pass the request to the controller
}, cityController.getCities);


module.exports = router;
