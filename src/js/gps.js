import { generateRandomCoordinates, logEntries } from '../data/mockData.js';

let trackingInterval = null;

function startSleepMode() {
  stopTracking(); // Clear any existing interval
  trackingInterval = setInterval(() => {
    const coords = generateRandomCoordinates();
    logEntries.push(coords);
    updateLog(coords);
    updateMap(coords);
  }, 5000); // 5-second check-ins
  updateStatus('Sleep Mode Active');
}

function startTrackMode() {
  stopTracking();
  trackingInterval = setInterval(() => {
    const coords = generateRandomCoordinates();
    logEntries.push(coords);
    updateLog(coords);
    updateMap(coords);
  }, 2000); // 2-second updates
  updateStatus('Track Mode Active');
}

function stopTracking() {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }
}

function updateLog(coords) {
  const logElement = document.getElementById('log');
  if (logElement) {
    const logEntry = `${coords.timestamp}: Lat ${coords.lat}, Lon ${coords.lon}`;
    logElement.innerHTML += `<div>${logEntry}</div>`;
    logElement.scrollTop = logElement.scrollHeight; // Auto-scroll to bottom
  }
}

function updateMap(coords) {
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    // Placeholder for map update (Clodate will implement Leaflet.js)
    mapContainer.innerHTML = `Map updated: Lat ${coords.lat}, Lon ${coords.lon}`;
  }
}

function updateStatus(message) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
  }
}

export { startSleepMode, startTrackMode, stopTracking };
