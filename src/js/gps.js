import L from 'leaflet';

const vehicleData = {
  lastLocation: { lat: -25.7463, lon: 28.1876 } // Pretoria coords
};

function updateMap(map) {
  map.setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13);
  L.marker([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon]).addTo(map)
    .bindPopup('Updated Location').openPopup();
}

function startSleepMode() {
  console.log('Sleep Mode activated');
}

function startTrackMode() {
  console.log('Track Mode activated');
}

function stopTracking() {
  console.log('Tracking stopped');
}

export { updateMap, vehicleData, startSleepMode, startTrackMode, stopTracking };
