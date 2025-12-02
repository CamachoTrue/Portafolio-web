const token = localStorage.getItem("token");
let editId = null;

if (window.location.pathname.includes("home.html")) {
  if (!token) window.location.href = "index.html";
  loadProjects();
}

async function loadProjects() {
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
      <td>
        ${p.repository ? `
          <button class="repo-btn" onclick="window.open('${p.repository}', '_blank')">Ver pagina</button>
          <button class="repo-btn copy-btn" onclick="copyRepo('${p.repository}')">Copiar URL</button>
        ` : ""}
      </td>
      <td>${Array.isArray(p.technologies) ? p.technologies.join(", ") : ""}</td>
      <td>${p.images && p.images.length > 0 ? `<img src="${p.images[0]}" class="thumb">` : ""}</td>
      <td class="actions">
        <button class="edit" onclick="openEdit('${p._id}', '${p.title}', '${p.description}', '${p.repository}', '${(p.technologies || []).join(", ")}', '${p.images && p.images.length > 0 ? p.images[0] : ""}')">Edit</button>
        <button class="delete" onclick="deleteProject('${p._id}')">Delete</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

async function createProject() {
  const title = document.getElementById("cTitle").value;
  const description = document.getElementById("cDesc").value;
  const repository = document.getElementById("cRepo").value;
  const image = document.getElementById("cImage").value.trim();
  const technologies = document.getElementById("cTech").value.split(",").map(x => x.trim());
  const images = image ? [image] : [];

  const res = await fetch(API + "/projects", {
    method: "POST",
    headers: {"Content-Type": "application/json", "auth-token": token},
    body: JSON.stringify({title, description, repository, technologies, images})
  });

  if (res.ok) {
    closeModals();
    loadProjects();
  } else alert("Error");
}

async function updateProject() {
  const title = document.getElementById("eTitle").value;
  const description = document.getElementById("eDesc").value;
  const repository = document.getElementById("eRepo").value;
  const image = document.getElementById("eImage").value.trim();
  const technologies = document.getElementById("eTech").value.split(",").map(x => x.trim());
  const images = image ? [image] : [];

  const res = await fetch(API + "/projects/" + editId, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "auth-token": token},
    body: JSON.stringify({title, description, repository, technologies, images})
  });

  if (res.ok) {
    closeModals();
    loadProjects();
  } else alert("Error");
}

async function deleteProject(id) {
  const res = await fetch(API + "/projects/" + id, {
    method: "DELETE",
    headers: {"auth-token": token}
  });

  if (res.ok) loadProjects();
  else alert("Error");
}

function copyRepo(url) {
  navigator.clipboard.writeText(url);
  alert("URL copiada");
}
