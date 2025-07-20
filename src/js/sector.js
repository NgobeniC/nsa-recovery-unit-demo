import { sectorVehicles, vehicleData } from '../data/mockData.js';

function initializeSector() {
  const sectorSelect = document.getElementById('sector');
  if (sectorSelect) {
    // Populate sector dropdown
    Object.keys(sectorVehicles).forEach(sector => {
      const option = document.createElement('option');
      option.value = sector;
      option.textContent = sector;
      sectorSelect.appendChild(option);
    });

    // Set initial sector
    sectorSelect.value = vehicleData.sector;
    updateVehicleInfo();

    // Handle sector change
    sectorSelect.addEventListener('change', () => {
      vehicleData.sector = sectorSelect.value;
      updateVehicleInfo();
    });
  }
}

function updateVehicleInfo() {
  const vehicleIdElement = document.getElementById('vehicle-id');
  const recoveryStatusElement = document.getElementById('recovery-status');
  if (vehicleIdElement && recoveryStatusElement) {
    vehicleIdElement.textContent = sectorVehicles[vehicleData.sector];
    recoveryStatusElement.textContent = `Sector: ${vehicleData.sector}, Battery: ${vehicleData.battery}, Last Check-in: ${vehicleData.lastCheckin}`;
  }
}

export { initializeSector };
