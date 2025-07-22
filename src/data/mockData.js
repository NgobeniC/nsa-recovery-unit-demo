import CryptoJS from 'crypto-js';

     const users = [
       { username: 'charlesn', passwordHash: CryptoJS.SHA256('SecurePass2025').toString(), role: 'user' },
       { username: 'clodate', passwordHash: CryptoJS.SHA256('Design123!').toString(), role: 'admin' }
     ];

     function hashPassword(password) {
       return CryptoJS.SHA256(password).toString();
     }

     function validateUser(username, passwordHash) {
       return users.find(u => u.username === username && u.passwordHash === passwordHash);
     }

     export const vehicleData = { id: "Car ABC123", battery: 85, lastLocation: { lat: -26.2041, lon: 28.0473 } };
     export const logEntries = [];
     export function generateRealisticCoordinates() {
       const baseLat = vehicleData.lastLocation.lat;
       const baseLon = vehicleData.lastLocation.lon;
       const offset = (Math.random() - 0.5) * 0.05; // Approx 5km variation
       return {
         lat: baseLat + offset,
         lon: baseLon + offset,
         timestamp: new Date().toLocaleString()
       };
     }
     export { hashPassword, validateUser };
