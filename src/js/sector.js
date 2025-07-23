function initializeSector() {
  console.log('Geographical zones initialized');
  // Initial zone setup if needed
}

function updateSector(zone, vehicleData) {
  console.log('Geographical zone updated to:', zone);
  const zoneCoords = {
    pretoria: { lat: -25.7463, lon: 28.1876 },
    johannesburg: { lat: -26.2041, lon: 28.0473 },
    capeTown: { lat: -33.9249, lon: 18.4241 },
    durban: { lat: -29.8587, lon: 31.0218 }
  };
  if (zoneCoords[zone]) {
    vehicleData.lastLocation = zoneCoords[zone];
  }
}

export { initializeSector, updateSector };
