import { initializeLogin } from './login.js';
import { startSleepMode, startTrackMode, stopTracking, updateMap, vehicleData } from './gps.js';
import { simulateLowSignal, simulateReconnect, storeCoordinate, toggleSignal, signalStatus } from './signal.js';
import { initializeSector } from './sector.js';
import { generateRandomCoordinates } from '../data/mockData.js';
import { getSession } from './login.js'; // Added for session check


function initializeApp() {
  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const userRole = document.getElementById('user-role');
  const securityIndicator = document.getElementById('security-indicator');
  const loginMessage = document.getElementById('login-message');


  // Session check
  if (!getSession()) {
    loginScreen.style.display = 'block';
    dashboard.style.display = 'none';
    return;
  }
  loginScreen.style.display = 'none';
  dashboard.style.display = 'block';
  userRole.textContent = `Role: ${getSession().role}`;
  securityIndicator.textContent = 'Secure Session Active';
  securityIndicator.style.color = 'green';


  initializeLogin();
  initializeSector();


  // Button event listeners
  const sleepBtn = document.getElementById('sleep-btn');
  const trackBtn = document.getElementById('track-btn');
  const updateBtn = document.getElementById('update-btn');
  const lowSignalBtn = document.getElementById('low-signal-btn');
  const reconnectBtn = document.getElementById('reconnect-btn');
  const logoutBtn = document.getElementById('logout-btn');


  if (sleepBtn) {
    sleepBtn.addEventListener('click', () => {
      startSleepMode();
      sleepBtn.classList.add('active');
      trackBtn.classList.remove('active');
      document.getElementById('status').textContent = 'Sleep';
    });
  }


  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      startTrackMode();
      trackBtn.classList.add('active');
      sleepBtn.classList.remove('active');
      document.getElementById('status').textContent = 'Track';
      updateMap(L.map('map-container').setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13));
    });
  }


  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      updateMap(L.map('map-container').setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13));
    });
  }


  if (lowSignalBtn) {
    lowSignalBtn.addEventListener('click', simulateLowSignal);
  }


  if (reconnectBtn) {
    reconnectBtn.addEventListener('click', simulateReconnect);
  }


  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      loginScreen.style.display = 'block';
      dashboard.style.display = 'none';
      userRole.textContent = '';
      loginMessage.textContent = 'Logged out successfully';
      securityIndicator.textContent = 'No Active Session';
      securityIndicator.style.color = 'orange';
    });
  }


  // Intercept GPS updates for low-signal storage
  const originalGenerateRandomCoordinates = generateRandomCoordinates;
  generateRandomCoordinates = () => {
    const coords = originalGenerateRandomCoordinates();
    storeCoordinate(coords);
    return coords;
  };


  // Initialize map and signal
  const map = L.map('map-container').setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
  L.marker([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon]).addTo(map)
    .bindPopup('Initial Location').openPopup();
  setInterval(toggleSignal, 10000);
  document.getElementById('signal-status').textContent = `Signal: ${signalStatus}`;


  // Start in Sleep Mode by default
  startSleepMode();
  if (sleepBtn) sleepBtn.classList.add('active');
}


document.addEventListener('DOMContentLoaded', initializeApp);
