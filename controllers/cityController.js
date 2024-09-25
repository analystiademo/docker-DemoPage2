const City = require('../models/City');

// Controller function to fetch city data
exports.getCities = async (req, res) => {
    try {
        console.log('Fetching city data from the database...');
        const cities = await City.fetchCityData();
        console.log('Data fetched successfully:', cities);
        res.json(cities);
    } catch (err) {
        console.error('Error querying database:', err);  // Log full error
        res.status(500).send('Error querying city data');
    }
};

