let activeToken = localStorage.getItem('jwt_token') || null;
let activeUser = JSON.parse(localStorage.getItem('user_data') || 'null');

document.addEventListener('DOMContentLoaded', () => {
  if (activeToken && activeUser) {
    showHomePage();
  } else {
    showLoginPage();
  }
});

function quickFill(email, password) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = password;
}

// 1. Handle User Login
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      activeToken = data.token;
      activeUser = data.user;

      localStorage.setItem('jwt_token', activeToken);
      localStorage.setItem('user_data', JSON.stringify(activeUser));

      showHomePage();
    } else {
      alert(data.message || 'Login failed!');
    }
  } catch (err) {
    alert('Server connection error!');
  }
}

// 2. Handle Registration
async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      activeToken = data.token;
      activeUser = data.user;

      localStorage.setItem('jwt_token', activeToken);
      localStorage.setItem('user_data', JSON.stringify(activeUser));

      alert('Registration successful!');
      showHomePage();
    } else {
      alert(data.message || 'Registration failed!');
    }
  } catch (err) {
    alert('Server connection error!');
  }
}

// 3. Show Home Page View
function showHomePage() {
  document.getElementById('login-page').classList.add('hidden');
  document.getElementById('home-page').classList.remove('hidden');

  document.getElementById('user-name').innerText = activeUser.name || 'User';
  document.getElementById('user-role').innerText = (activeUser.role || 'STUDENT').toUpperCase();
  document.getElementById('user-id').innerText = activeUser.id || '-';
  document.getElementById('user-email').innerText = activeUser.email || '-';
  document.getElementById('user-dept').innerText = activeUser.department || 'Computer Science Engineering';

  document.getElementById('students-output').innerText = 'Click "Load Records" to fetch student data.';
}

// 4. Show Login Page View
function showLoginPage() {
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('login-page').classList.remove('hidden');
}

// 5. Handle Logout
function handleLogout() {
  activeToken = null;
  activeUser = null;
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_data');
  showLoginPage();
}

// 6. Fetch Student Records (GET /students)
async function loadStudents() {
  if (!activeToken) {
    alert('Please log in first!');
    return;
  }

  try {
    const response = await fetch('/students', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + activeToken }
    });

    const data = await response.json();
    document.getElementById('students-output').innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById('students-output').innerText = 'Failed to load records.';
  }
}
