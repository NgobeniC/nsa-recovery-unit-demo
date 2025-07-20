import { initializeLogin } from './login.js';
import { startSleepMode, startTrackMode, stopTracking } from './gps.js';
import { simulateLowSignal, simulateReconnect, storeCoordinate } from './signal.js';
import { initializeSector } from './sector.js';
import { generateRandomCoordinates } from '../data/mockData.js';

function initializeApp() {
  initializeLogin();
  initializeSector();

  // Button event listeners
  const sleepBtn = document.getElementById('sleep-btn');
  const trackBtn = document.getElementById('track-btn');
  const lowSignalBtn = document.getElementById('low-signal-btn');
  const reconnectBtn = document.getElementById('reconnect-btn');

  if (sleepBtn) {
    sleepBtn.addEventListener('click', () => {
      startSleepMode();
      sleepBtn.classList.add('active');
      trackBtn.classList.remove('active');
    });
  }

  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      startTrackMode();
      trackBtn.classList.add('active');
      sleepBtn.classList.remove('active');
    });
  }

  if (lowSignalBtn) {
    lowSignalBtn.addEventListener('click', simulateLowSignal);
  }

  if (reconnectBtn) {
    reconnectBtn.addEventListener('click', simulateReconnect);
  }

  // Intercept GPS updates for low-signal storage
  const originalGenerateRandomCoordinates = generateRandomCoordinates;
  generateRandomCoordinates = () => {
    const coords = originalGenerateRandomCoordinates();
    storeCoordinate(coords);
    return coords;
  };

  // Start in Sleep Mode by default
  startSleepMode();
  sleepBtn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', initializeApp);
