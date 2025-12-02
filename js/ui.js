function openCreate() {
  document.getElementById("modalCreate").style.display = "flex";
}

function openEdit(id, t, d, r, tech, img) {
  editId = id;
  document.getElementById("eTitle").value = t;
  document.getElementById("eDesc").value = d;
  document.getElementById("eRepo").value = r;
  document.getElementById("eTech").value = tech;
  document.getElementById("eImage").value = img;
  document.getElementById("modalEdit").style.display = "flex";
}

function closeModals() {
  document.getElementById("modalCreate").style.display = "none";
  document.getElementById("modalEdit").style.display = "none";
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("modal-bg")) closeModals();
});
