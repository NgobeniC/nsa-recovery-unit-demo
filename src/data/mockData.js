import { vehicleData } from '../js/gps.js';

function generateRandomCoordinates() {
  const lat = vehicleData.lastLocation.lat + (Math.random() - 0.5) * 0.025; // ±0.025 degrees (~2.5-3 km)
  const lon = vehicleData.lastLocation.lon + (Math.random() - 0.5) * 0.025;
  // Bounds for South Africa (approx. lat: -22 to -35, lon: 16 to 33)
  return {
    lat: Math.max(-35, Math.min(-22, lat)),
    lon: Math.max(16, Math.min(33, lon))
  };
}

export { generateRandomCoordinates };
