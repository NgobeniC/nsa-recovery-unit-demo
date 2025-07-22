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
      console.log('Validating:', username, password);
       if (!username || !password || username.length < 4 || password.length < 8) {
        console.log('Validation failed: Length check');
         return { success: false, message: 'Username must be 4+ chars, password 8+ chars' };
       }
       const user = validateUser(username, hashPassword(password));
       console.log('User found:', user);
       if (user) {
         currentSession = { username: user.username, role: user.role, timestamp: Date.now() };
         console.log('Session set:', currentSession);
         return { success: true, message: `Login successful as ${user.role}, redirecting...`, role: user.role };
       }
       console.log('Validation failed: Invalid credentials');
       return { success: false, message: 'Invalid username or password' };
     }

     function logout() {
       currentSession = null;
     }

     export { validateLogin, logout, getSession };
