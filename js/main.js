const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

if (window.location.pathname.includes("home.html")) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
  } else {
    loadProjects();
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (!email || !pass) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch(API_BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: pass })
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Error: " + (data.message || "Unauthorized"));
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  window.location.href = "home.html";
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const itsonId = document.getElementById("itsonId").value;
  const pass = document.getElementById("password").value;

  if (!name || !email || !itsonId || !pass) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch(API_BASE + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      itsonId,
      password: pass
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Error: " + (data.message || "Error registering"));
    return;
  }

  alert("Account created");
  window.location.href = "index.html";
}

async function loadProjects() {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + "/projects", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    console.warn("No projects available for this user");
    return; 
  }

  const data = await res.json();
  const box = document.getElementById("projects");

  box.innerHTML = "";

  data.forEach(p => {
    const item = document.createElement("p");
    item.textContent = p.title || "Project";
    box.appendChild(item);
  });
}
