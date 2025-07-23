let currentSession = null;

function validateUser(username, passwordHash) {
  const users = [
    { username: 'charlesn', passwordHash: CryptoJS.SHA256('SecurePass2025').toString(), role: 'Admin' },
    { username: 'clodate', passwordHash: CryptoJS.SHA256('Design123!').toString(), role: 'Designer' }
  ];
  return users.find(u => u.username === username && u.passwordHash === passwordHash) || null;
}

function getSession() {
  return currentSession;
}

function validateLogin(username, password) {
  console.log('Validating:', username, password);
  if (!username || !password || username.length < 4 || password.length < 8) {
    return { success: false, message: 'Username must be 4+ chars, password 8+ chars' };
  }
  const user = validateUser(username, CryptoJS.SHA256(password).toString());
  console.log('User found:', user);
  if (user) {
    currentSession = { username: user.username, role: user.role, timestamp: Date.now() };
    return { success: true, message: `Login successful as ${user.role}`, role: user.role };
  }
  return { success: false, message: 'Invalid username or password' };
}

function logout() {
  currentSession = null;
}

export { validateLogin, logout, getSession };
