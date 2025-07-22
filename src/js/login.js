  import { validateUser, hashPassword } from '../data/mockData.js';

     // Simulate session storage with timestamp
     let currentSession = null;

     function getSession() {
       if (currentSession && (Date.now() - currentSession.timestamp) < 24 * 60 * 60 * 1000) { // 24-hour session
         return currentSession;
       }
       currentSession = null;
       return null;
     }

     function validateLogin(username, password) {
       if (!username || !password || username.length < 4 || password.length < 8) {
         return { success: false, message: 'Username must be 4+ chars, password 8+ chars' };
       }
       const user = validateUser(username, hashPassword(password));
       if (user) {
         currentSession = { username: user.username, role: user.role, timestamp: Date.now() };
         return { success: true, message: `Login successful as ${user.role}, redirecting...`, role: user.role };
       }
       return { success: false, message: 'Invalid username or password' };
     }

     function logout() {
       currentSession = null;
     }

     export { validateLogin, logout, getSession };
