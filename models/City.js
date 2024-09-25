const pool = require('../config/db');

// Fetch city data from the database
exports.fetchCityData = async () => {
    const query = `
        SELECT 
            city, 
            split_part(loc, ',', 1) AS lat,  
            split_part(loc, ',', 2) AS lon,  
            COUNT(*) AS count,
            MAX(timestamp) AS timestamp
        FROM ipinfo
        WHERE city IS NOT NULL AND loc IS NOT NULL
        GROUP BY city, lat, lon;
    `;
    
    const result = await pool.query(query);
    return result.rows;
};
