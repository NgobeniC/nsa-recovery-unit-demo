import { initializeSector, updateSector } from './sector.js';
import { updateMap, vehicleData } from './gps.js';
import { simulateLowSignal, simulateReconnect, storeCoordinate, toggleSignal, signalStatus } from './signal.js';
import { initializeLogin, validateLogin, logout, getSession } from './login.js';
import { generateRandomCoordinates } from '../data/mockData.js';

// Store map instance globally
let map = null;

function initializeApp() {
  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const userRole = document.getElementById('user-role');
  const securityIndicator = document.getElementById('security-indicator');
  const loginMessage = document.getElementById('login-message');
  const loginForm = document.getElementById('login-form');
  const sectorSelect = document.getElementById('sector');
  const log = document.querySelector('#log ul');

  // Session check and login handler
  if (getSession()) {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    userRole.textContent = `Role: ${getSession().role}`;
    securityIndicator.textContent = 'Secure Session Active';
    securityIndicator.style.color = 'green';
  } else {
    loginScreen.style.display = 'block';
  }

  if (loginForm && !loginForm.dataset.initialized) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const result = validateLogin(username, password);
      loginMessage.textContent = result.message;
      if (result.success) {
        loginScreen.style.display = 'none';
        dashboard.style.display = 'block';
        userRole.textContent = `Role: ${result.role}`;
        securityIndicator.textContent = 'Secure Session Active';
        securityIndicator.style.color = 'green';
        log.innerHTML += `<li>Logged in as ${result.role} at ${new Date().toLocaleTimeString()}</li>`;
      } else {
        securityIndicator.textContent = 'Login Failed';
        securityIndicator.style.color = 'red';
      }
    });
    loginForm.dataset.initialized = 'true';
  }

  // Initialize sectors (geographical zones) and listener
  initializeSector();
  if (sectorSelect && !sectorSelect.dataset.initialized) {
    sectorSelect.addEventListener('change', (e) => {
      updateSector(e.target.value, vehicleData);
      const zoneName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      document.getElementById('status').textContent = `Zone: ${zoneName}`;
      const zoneCoords = {
        pretoria: [-25.7463, 28.1876],
        johannesburg: [-26.2041, 28.0473],
        capeTown: [-33.9249, 18.4241],
        durban: [-29.8587, 31.0218]
      };
      const coords = zoneCoords[e.target.value] || [vehicleData.lastLocation.lat, vehicleData.lastLocation.lon];
      if (map) map.remove();
      map = L.map('map-container').setView(coords, 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
      L.marker(coords).addTo(map)
        .bindPopup(`Zone: ${zoneName}`).openPopup();
      log.innerHTML += `<li>Zone changed to ${zoneName} at ${new Date().toLocaleTimeString()}</li>`;
    });
    sectorSelect.dataset.initialized = 'true';
  }

  // Button event listeners
  const sleepBtn = document.getElementById('sleep-btn');
  const trackBtn = document.getElementById('track-btn');
  const updateBtn = document.getElementById('update-btn');
  const lowSignalBtn = document.getElementById('low-signal-btn');
  const reconnectBtn = document.getElementById('reconnect-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (sleepBtn && !sleepBtn.dataset.initialized) {
    sleepBtn.addEventListener('click', () => {
      startSleepMode();
      sleepBtn.classList.add('active');
      trackBtn.classList.remove('active');
      document.getElementById('status').textContent = 'Sleep';
      log.innerHTML += `<li>Switched to Sleep Mode at ${new Date().toLocaleTimeString()}</li>`;
    });
    sleepBtn.dataset.initialized = 'true';
  }

  if (trackBtn && !trackBtn.dataset.initialized) {
    trackBtn.addEventListener('click', () => {
      startTrackMode();
      trackBtn.classList.add('active');
      sleepBtn.classList.remove('active');
      document.getElementById('status').textContent = 'Track';
      if (map) map.setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13);
      log.innerHTML += `<li>Switched to Track Mode at ${new Date().toLocaleTimeString()}</li>`;
    });
    trackBtn.dataset.initialized = 'true';
  }

  if (updateBtn && !updateBtn.dataset.initialized) {
    updateBtn.addEventListener('click', () => {
      updateMap(map);
      log.innerHTML += `<li>Updated location at ${new Date().toLocaleTimeString()}</li>`;
    });
    updateBtn.dataset.initialized = 'true';
  }

  if (lowSignalBtn && !lowSignalBtn.dataset.initialized) {
    lowSignalBtn.addEventListener('click', simulateLowSignal);
    lowSignalBtn.dataset.initialized = 'true';
  }

  if (reconnectBtn && !reconnectBtn.dataset.initialized) {
    reconnectBtn.addEventListener('click', simulateReconnect);
    reconnectBtn.dataset.initialized = 'true';
  }

  if (logoutBtn && !logoutBtn.dataset.initialized) {
    logoutBtn.addEventListener('click', () => {
      logout();
      loginScreen.style.display = 'block';
      dashboard.style.display = 'none';
      userRole.textContent = '';
      loginMessage.textContent = 'Logged out successfully';
      securityIndicator.textContent = 'No Active Session';
      securityIndicator.style.color = 'orange';
      log.innerHTML += `<li>Logged out at ${new Date().toLocaleTimeString()}</li>`;
    });
    logoutBtn.dataset.initialized = 'true';
  }

  // Intercept GPS updates
  const originalGenerateRandomCoordinates = generateRandomCoordinates;
  generateRandomCoordinates = () => {
    const coords = originalGenerateRandomCoordinates();
    storeCoordinate(coords);
    if (map) map.setView([coords.lat, coords.lon], 13);
    log.innerHTML += `<li>Generated random coords: ${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)} at ${new Date().toLocaleTimeString()}</li>`;
    return coords;
  };

  // Initialize map and signal if not exists
  if (!map) {
    map = L.map('map-container').setView([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([vehicleData.lastLocation.lat, vehicleData.lastLocation.lon]).addTo(map)
      .bindPopup('Initial Location').openPopup();
  }
  setInterval(toggleSignal, 10000);
  document.getElementById('signal-status').textContent = `Signal: ${signalStatus}`;

  // Start in Sleep Mode by default
  startSleepMode();
  if (sleepBtn) sleepBtn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', initializeApp);
