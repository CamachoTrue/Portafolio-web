const API = "https://portfolio-api-three-black.vercel.app/api/v1";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  });

  const data = await res.json();
  if (!res.ok) return alert("Error");

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  window.location.href = "home.html";
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const itsonId = document.getElementById("itsonId").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, email, itsonId, password})
  });

  if (!res.ok) return alert("Error");

  alert("Account created");
  window.location.href = "index.html";
}
