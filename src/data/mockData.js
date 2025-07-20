// Mock vehicle data 
const vehicleData = {
  vehicleId: "ABC123",
  sector: "Private",
  lastCheckin: "2025-07-20 12:00 PM", // Matches current date
  battery: "85%", // Reflects NSA RU’s 24-month battery life
  status: "Sleep",
  lastLocation: { lat: -26.2041, lon: 28.0473 } 
};

// Mock log entries 
const logEntries = [
  { timestamp: "2025-07-20 11:55 AM", lat: -26.2041, lon: 28.0473},
  { timestamp: "2025-07-20 12:00 PM", lat: -26.2043, lon: 28.0471 }
];

// Generate random GPS coordinates (near Johannesburg for demo)
function generateRandomCoordinates() {
  const lat = (-26.2 - Math.random() * 0.1).toFixed(4); // Range: -26.2 to -26.3
  const lon = (28.0 + Math.random() * 0.1).toFixed(4); // Range: 28.0 to 28.1
  return { lat, lon, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Africa/Johannesburg' }) };

}

// Sector-specific assets (NSA RU’s use cases)
const sectorVehicles = {
  Private: "Car ABC123",
  Rental: "Rental Car DEF456",
  Courier: "Delivery Truck GHI789",
  Construction: "Bulldozer XYZ789",
  Agriculture: "Tractor JKL012",
  Transit: "Bus MNO345"
};

export { vehicleData, logEntries, generateRandomCoordinates, sectorVehicles };
