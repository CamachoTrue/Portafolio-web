const API = "https://portfolio-api-three-black.vercel.app/api/v1";
let editId = null;

if (window.location.pathname.includes("home.html")) {
  const t = localStorage.getItem("token");
  if (!t) window.location.href = "index.html";
  loadProjects();
}

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
  if (!res.ok) return alert(data.message || "Error");

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

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Error");

  alert("Account created");
  window.location.href = "index.html";
}

async function loadProjects() {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/projects", {
    headers: {"auth-token": token}
  });

  const data = await res.json();
  const table = document.getElementById("projectsTable");
  table.innerHTML = "";

  data.forEach(p => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.title}</td>
      <td>${p.description}</td>
      <td>${p.repository || ""}</td>
      <td>${Array.isArray(p.technologies) ? p.technologies.join(", ") : ""}</td>
      <td class="actions">
        <button class="edit" onclick="openEdit('${p._id}', '${p.title}', '${p.description}', '${p.repository}', '${(p.technologies || []).join(", ")}')">Edit</button>
        <button class="delete" onclick="deleteProject('${p._id}')">Delete</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function openCreate() {
  document.getElementById("modalCreate").style.display = "flex";
}

function openEdit(id, t, d, r, tech) {
  editId = id;
  document.getElementById("eTitle").value = t;
  document.getElementById("eDesc").value = d;
  document.getElementById("eRepo").value = r;
  document.getElementById("eTech").value = tech;
  document.getElementById("modalEdit").style.display = "flex";
}

async function createProject() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("cTitle").value;
  const description = document.getElementById("cDesc").value;
  const repository = document.getElementById("cRepo").value;
  const technologies = document.getElementById("cTech").value.split(",").map(x => x.trim());

  const res = await fetch(API + "/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({title, description, repository, technologies})
  });

  if (res.ok) {
    document.getElementById("modalCreate").style.display = "none";
    loadProjects();
  } else {
    const err = await res.json();
    alert(err.message || "Error");
  }
}

async function updateProject() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("eTitle").value;
  const description = document.getElementById("eDesc").value;
  const repository = document.getElementById("eRepo").value;
  const technologies = document.getElementById("eTech").value.split(",").map(x => x.trim());

  const res = await fetch(API + "/projects/" + editId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({title, description, repository, technologies})
  });

  if (res.ok) {
    document.getElementById("modalEdit").style.display = "none";
    loadProjects();
  } else {
    const err = await res.json();
    alert(err.message || "Error updating");
  }
}

async function deleteProject(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/projects/" + id, {
    method: "DELETE",
    headers: {"auth-token": token}
  });

  if (res.ok) loadProjects();
  else {
    const err = await res.json();
    alert(err.message || "Error deleting");
  }
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("modal-bg")) {
    e.target.style.display = "none";
  }
});
