 import { vehicleData, logEntries, generateRealisticCoordinates } from '../data/mockData.js';

     let mapInstance;
     function updateMap(map) {
       mapInstance = map;
       const coords = generateRealisticCoordinates();
       vehicleData.lastLocation = { lat: coords.lat, lon: coords.lon };
       vehicleData.lastCheckin = coords.timestamp;

       // Real-world constraint (50km radius around Johannesburg)
       const maxOffset = 0.5;
       vehicleData.lastLocation.lat = Math.max(-26.7041, Math.min(-25.7041, vehicleData.lastLocation.lat));
       vehicleData.lastLocation.lon = Math.max(27.5473, Math.min(28.5473, vehicleData.lastLocation.lon));

       map.setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13);
       map.eachLayer(layer => {
         if (layer instanceof L.Marker) map.removeLayer(layer);
       });
       const marker = L.marker([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon]).addTo(map)
         .bindPopup(`Last Check-in: ${vehicleData.lastCheckin}<br>Battery: ${vehicleData.battery}%`).openPopup();

       // Real-time battery simulation
       const status = document.getElementById('status').textContent;
       if (status === 'Sleep' && vehicleData.battery < 85) {
         vehicleData.battery = Math.min(85, vehicleData.battery + 0.2);
       } else if (status === 'Track' && vehicleData.battery > 0) {
         vehicleData.battery = Math.max(0, vehicleData.battery - 0.1);
       }
       const logEntry = `Battery: ${vehicleData.battery.toFixed(1)}% at ${coords.timestamp}`;
       logEntries.push(logEntry);
       document.getElementById('battery-log').innerHTML += `<p>${logEntry}</p>`;

       if (logEntries.length > 5) {
         logEntries.shift();
         document.getElementById('battery-log').innerHTML = logEntries.map(entry => `<p>${entry}</p>`).join('');
       }
     }

     export { updateMap, vehicleData };
