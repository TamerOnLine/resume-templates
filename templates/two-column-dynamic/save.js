// save.js
const STORAGE_KEY = "tamer-resume-data";

function printPage() {
  window.print();
}

function saveToLocalStorage() {
  const container = document.querySelector(".container");
  localStorage.setItem(STORAGE_KEY, container.innerHTML);
  alert("✔️ Saved successfully!");
}

function clearStorage() {
  if (confirm("Are you sure you want to reset all changes?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

function editTextContent(el) {
  const currentValue = el.innerText;
  const newValue = prompt("Edit value:", currentValue);
  if (newValue !== null && newValue.trim() !== "") {
    el.innerText = newValue;
  }
}

function editLinkContent(container) {
  const a = container.querySelector("a");
  const newText = prompt("Enter link text:", a.innerText);
  const newHref = prompt("Enter URL:", a.href);
  if (newText && newHref) {
    a.innerText = newText;
    a.href = newHref;
    a.target = "_blank";
  }
}

function deleteBlock(btn) {
  const block = btn.closest(".project-box, li, .left-column > div, ul, .project-section");
  if (block && confirm("Delete this block?")) {
    block.remove();
  }
}

function togglePrint(btn) {
  const block = btn.closest("p, li, h3, h2, div, ul, .project-section");
  if (block) {
    block.classList.toggle("no-print");
    btn.textContent = block.classList.contains("no-print") ? "👁️ Show in print" : "🙈 Hide from print";
  }
}

function addMoveEffect(el) {
  el.style.transition = "background-color 0.3s ease";
  el.style.backgroundColor = "#ffffcc";
  setTimeout(() => (el.style.backgroundColor = ""), 300);
}

function moveUp(btn) {
  const block = btn.closest("li, .project-box, p, .left-column > div, ul, .project-section");
  const prev = block?.previousElementSibling;
  if (prev && prev.tagName === block.tagName) {
    block.parentNode.insertBefore(block, prev);
    addMoveEffect(block);
  }
}

function moveDown(btn) {
  const block = btn.closest("li, .project-box, p, .left-column > div, ul, .project-section");
  const next = block?.nextElementSibling;
  if (next && next.tagName === block.tagName) {
    block.parentNode.insertBefore(next, block);
    addMoveEffect(block);
  }
}

function addLeftItem(targetUl) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong contenteditable>Label:</strong>
    <span contenteditable>Value</span>
    <span class="edit-button">
      <button data-delete>🗑️</button>
      <button data-toggle-print>🙈 Hide from print</button>
      <button data-move-up>⬆️</button>
      <button data-move-down>⬇️</button>
    </span>
  `;
  targetUl.appendChild(li);
}

function addProject(sectionId) {
  const container = document.querySelector(`#${sectionId}`);
  const box = document.createElement("div");
  box.className = "project-box";
  box.innerHTML = `
    <h3 contenteditable>New Project</h3>
    <p contenteditable>Description here...</p>
    <div class="edit-button">
      <button data-delete>🗑️</button>
      <button data-toggle-print>🙈 Hide from print</button>
      <button data-move-up>⬆️</button>
      <button data-move-down>⬇️</button>
    </div>
  `;
  container.appendChild(box);
}

function addLeftSection() {
  const leftColumn = document.querySelector(".left-column");
  const wrapper = document.createElement("div");
  const sectionId = `left-section-${Date.now()}`;
  wrapper.innerHTML = `
    <h2>
      <span contenteditable>New Section</span>
      <span class="edit-button">
        <button data-delete>🗑️</button>
        <button data-toggle-print>🙈 Hide from print</button>
        <button data-move-up>⬆️</button>
        <button data-move-down>⬇️</button>
      </span>
    </h2>
    <ul id="${sectionId}">
      <li>
        <strong contenteditable>Label:</strong>
        <span contenteditable>Value</span>
        <span class="edit-button">
          <button data-delete>🗑️</button>
          <button data-toggle-print>🙈 Hide from print</button>
          <button data-move-up>⬆️</button>
          <button data-move-down>⬇️</button>
        </span>
      </li>
    </ul>
    <div style="text-align: right;" class="no-print">
      <button class="add-left-item" data-target="${sectionId}">➕ Add Info</button>
    </div>
  `;
  leftColumn.appendChild(wrapper);
}

function addProjectSection() {
  const rightSection = document.querySelector(".container > div:last-of-type");
  const sectionId = `projects-section-${Date.now()}`;
  const section = document.createElement("div");
  section.className = "project-section";
  section.id = sectionId;
  section.innerHTML = `
    <h2>
      <span contenteditable>New Projects Section</span>
      <span class="edit-button">
        <button data-delete>🗑️</button>
        <button data-toggle-print>🙈 Hide from print</button>
        <button data-move-up>⬆️</button>
        <button data-move-down>⬇️</button>
      </span>
    </h2>
    <div style="text-align: right; margin-bottom: 10px;" class="no-print">
      <button class="add-project" data-section="${sectionId}">➕ New Project</button>
    </div>
  `;
  rightSection.appendChild(section);
}

function delegateEvents() {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.matches("[data-edit]")) {
      editTextContent(document.getElementById(btn.dataset.edit));
    } else if (btn.matches("[data-edit-link]")) {
      editLinkContent(document.getElementById(btn.dataset.editLink));
    } else if (btn.matches("[data-delete]")) {
      deleteBlock(btn);
    } else if (btn.matches("[data-toggle-print]")) {
      togglePrint(btn);
    } else if (btn.matches("[data-move-up]")) {
      moveUp(btn);
    } else if (btn.matches("[data-move-down]")) {
      moveDown(btn);
    } else if (btn.id === "save-btn") {
      saveToLocalStorage();
    } else if (btn.id === "clear-btn") {
      clearStorage();
    } else if (btn.id === "edit-pic") {
      const newUrl = prompt("Enter image URL:");
      if (newUrl) {
        document.getElementById("profile-pic").src = newUrl;
      }
    } else if (btn.classList.contains("add-left-item")) {
      const ul = document.getElementById(btn.dataset.target);
      if (ul) addLeftItem(ul);
    } else if (btn.classList.contains("add-project")) {
      addProject(btn.dataset.section);
    } else if (btn.id === "add-left-section") {
      addLeftSection();
    } else if (btn.id === "add-project-section") {
      addProjectSection();
    }
  });
}

function restoreContent() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    document.querySelector(".container").innerHTML = saved;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  restoreContent();
  delegateEvents();
});
