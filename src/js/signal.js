let signalStatus = 'Strong';

function toggleSignal() {
  signalStatus = signalStatus === 'Strong' ? 'Weak' : 'Strong';
  document.getElementById('signal-status').textContent = `Signal: ${signalStatus}`;
}

function simulateLowSignal() {
  signalStatus = 'Weak';
  document.getElementById('signal-status').textContent = `Signal: ${signalStatus}`;
}

function simulateReconnect() {
  signalStatus = 'Strong';
  document.getElementById('signal-status').textContent = `Signal: ${signalStatus}`;
}

function storeCoordinate(coords) {
  console.log('Stored coordinate:', coords);
}

export { toggleSignal, signalStatus, simulateLowSignal, simulateReconnect, storeCoordinate };
