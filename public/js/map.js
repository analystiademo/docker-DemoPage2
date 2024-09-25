// Initialize the map with a global view (centered on [0, 0] with zoom level 2 to display the whole world)
var map = L.map('map').setView([0, 0], 2); // Zoom level 2 to show most of the world

// Load and display the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Use a fixed red color for all markers
const markerColor = '#FF0000'; // Red color for all markers

// Fetch location data from the server
fetch('/api/cities/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {

        // Loop through each location and add a marker
        data.forEach(location => {
            const lat = parseFloat(location.lat);
            const lon = parseFloat(location.lon);
                     
            if (!isNaN(lat) && !isNaN(lon)) {  // Ensure lat and lon are valid numbers
                L.circleMarker([lat, lon], {
                    radius: 5,
                    color: markerColor,  // Fixed red color for border
                    fillColor: markerColor,  // Fixed red color for fill
                    fillOpacity: 0.7
                }).addTo(map)
                .bindPopup(`
                    City: ${location.city}<br>
                    Location(Lat,Lon): ${lat.toFixed(6)}, ${lon.toFixed(6)}<br>
                    Last Time Stamp: ${location.timestamp || 'No timestamp available'}<br>
                    Count: ${location.count}
                `);  // Display city name, exact location, timestamp, and count
            }
        });
    })
    .catch(err => console.error('Error fetching location data:', err));
