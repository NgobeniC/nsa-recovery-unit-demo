import { generateRandomCoordinates, logEntries } from '../data/mockData.js';

let isLowSignal = false;
const storedCoordinates = [];

function simulateLowSignal() {
  isLowSignal = true;
  document.getElementById('status').textContent = 'Low Signal: Storing coordinates locally';
  document.getElementById('low-signal-btn').disabled = true;
  document.getElementById('reconnect-btn').disabled = false;
}

function simulateReconnect() {
  if (isLowSignal) {
    isLowSignal = false;
    document.getElementById('status').textContent = 'Reconnected: Uploading stored coordinates';
    storedCoordinates.forEach(coords => {
      logEntries.push(coords);
      updateLog(coords);
      updateMap(coords);
    });
    storedCoordinates.length = 0; // Clear stored coordinates
    document.getElementById('low-signal-btn').disabled = false;
    document.getElementById('reconnect-btn').disabled = true;
  }
}

function storeCoordinate(coords) {
  if (isLowSignal) {
    storedCoordinates.push(coords);
  }
}

function updateLog(coords) {
  const logElement = document.getElementById('log');
  if (logElement) {
    const logEntry = `${coords.timestamp}: Lat ${coords.lat}, Lon ${coords.lon} (Reconnected)`;
    logElement.innerHTML += `<div>${logEntry}</div>`;
    logElement.scrollTop = logElement.scrollHeight;
  }
}

function updateMap(coords) {
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.innerHTML = `Map updated: Lat ${coords.lat}, Lon ${coords.lon}`;
  }
}

export { simulateLowSignal, simulateReconnect, storeCoordinate };
