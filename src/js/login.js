function simulateLogin(username, password) {
  if (username && password) {
    console.log("Login successful, redirecting to dashboard...");
    return true;
  } else {
    console.log("Invalid credentials");
    return false;
  }
}

function initializeLogin() {
  const loginButton = document.getElementById('login-btn');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      const username = document.getElementById('username')?.value;
      const password = document.getElementById('password')?.value;
      if (simulateLogin(username, password)) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
      } else {
        alert("Please enter username and password");
      }
    });
  } else {
    console.error("Login button not found");
  }
}
b
export { simulateLogin, initializeLogin };
