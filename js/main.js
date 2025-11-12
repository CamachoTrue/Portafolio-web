if (window.location.pathname.includes('home.html')) {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = 'index.html'
  }
}

function login() {
  const email = document.getElementById('email').value
  const pass = document.getElementById('password').value
  if (email && pass) {
    localStorage.setItem('token', 'token123')
    window.location.href = 'home.html'
  } else {
    alert('Fill all fields')
  }
}

function register() {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const pass = document.getElementById('password').value
  if (name && email && pass) {
    alert('User created')
    window.location.href = 'index.html'
  } else {
    alert('Fill all fields')
  }
}

function logout() {
  localStorage.removeItem('token')
  window.location.href = 'index.html'
}
