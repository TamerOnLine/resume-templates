function printPage() {
  window.print();
}

function editField(id) {
  const element = document.getElementById(id);
  const currentValue = element.innerText;
  const newValue = prompt("Enter new value:", currentValue);
  if (newValue !== null && newValue.trim() !== "") {
    element.innerText = newValue;
  }
}

function editLink(id) {
  const element = document.getElementById(id).querySelector("a");
  const currentText = element.innerText;
  const currentHref = element.href;
  const newText = prompt("Enter link text:", currentText);
  const newHref = prompt("Enter URL:", currentHref);
  if (newText && newHref) {
    element.innerText = newText;
    element.href = newHref;
    element.setAttribute("target", "_blank"); // ✅ Open in new tab
  }
}


function deleteElement(button) {
  const box = button.closest(".project-box") || button.closest("li") || button.closest(".left-column > div");
  if (box && confirm("Do you want to delete this item?")) box.remove();
}

function togglePrintVisibility(button) {
  const block = button.closest("p, li, h3, h2, div");
  if (!block) return;
  block.classList.toggle("no-print");
  button.innerText = block.classList.contains("no-print")
    ? "👁️ Show in print"
    : "🙈 Hide from print";
}

function moveUp(button) {
  const element = button.closest("li, .project-box");
  if (element && element.previousElementSibling && element.previousElementSibling.tagName === element.tagName) {
    element.parentNode.insertBefore(element, element.previousElementSibling);
    return;
  }
  const section = findSectionContainer(button);
  if (section && section.previousElementSibling) {
    section.parentNode.insertBefore(section, section.previousElementSibling);
  }
}

function moveDown(button) {
  const element = button.closest("li, .project-box");
  if (element && element.nextElementSibling && element.nextElementSibling.tagName === element.tagName) {
    element.parentNode.insertBefore(element.nextElementSibling, element);
    return;
  }
  const section = findSectionContainer(button);
  if (section && section.nextElementSibling) {
    section.parentNode.insertBefore(section.nextElementSibling, section);
  }
}

function findSectionContainer(button) {
  return button.closest(".left-column > div, .left-column, [id^='projects-section']");
}

function addLeftItem(button) {
  const section = button.closest("div").nextElementSibling;
  if (!section || section.tagName !== "UL") return;
  const itemCount = section.querySelectorAll("li").length + 1;
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <strong id="label-customX${itemCount}">Label ${itemCount}:</strong>
    <span id="customX${itemCount}">Value ${itemCount}</span>
    <span class="edit-button">
      <button onclick="editField('label-customX${itemCount}')">✏️</button>
      <button onclick="editField('customX${itemCount}')">🖊️</button>
      <button onclick="deleteElement(this)">🗑️</button>
      <button onclick="togglePrintVisibility(this)">🙈 Hide from print</button>
      <button onclick="moveUp(this)">⬆️</button>
      <button onclick="moveDown(this)">⬇️</button>
    </span>`;
  section.appendChild(newItem);
}

function addLeftSection() {
  const column = document.querySelector(".left-column");
  const sectionCount = column.querySelectorAll("h2").length + 1;
  const section = document.createElement("div");
  section.innerHTML = `
    <h2>
      <span id="left-section-title${sectionCount}">Subsection ${sectionCount}</span>
      <span class="edit-button">
        <button onclick="editField('left-section-title${sectionCount}')">✏️</button>
        <button onclick="deleteElement(this)">🗑️</button>
        <button onclick="togglePrintVisibility(this)">🙈 Hide from print</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </h2>
    <div style="text-align: right;" class="no-print">
      <button onclick="addLeftItem(this)">➕ Add item</button>
    </div>
    <ul>
      <li>
        <strong id="label-custom${sectionCount}-1">Label:</strong>
        <span id="custom${sectionCount}-1">Value</span>
        <span class="edit-button">
          <button onclick="editField('label-custom${sectionCount}-1')">✏️</button>
          <button onclick="editField('custom${sectionCount}-1')">🖊️</button>
          <button onclick="deleteElement(this)">🗑️</button>
          <button onclick="togglePrintVisibility(this)">🙈 Hide from print</button>
          <button onclick="moveUp(this)">⬆️</button>
          <button onclick="moveDown(this)">⬇️</button>
        </span>
      </li>
    </ul>`;
  column.appendChild(section);
}

function addProjectsSection() {
  const container = document.querySelector(".container > div:last-child");
  const sectionCount = document.querySelectorAll('[id^="projects-section"]').length + 1;
  const section = document.createElement("div");
  section.id = `projects-section-${sectionCount}`;
  section.innerHTML = `
    <h2>
      <span id="projects-title-${sectionCount}">Project Section ${sectionCount}</span>
      <span class="edit-button">
        <button onclick="editField('projects-title-${sectionCount}')">✏️</button>
        <button onclick="this.closest('div').remove()">🗑️</button>
        <button onclick="togglePrintVisibility(this)">🙈 Hide from print</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </h2>
    <div style="text-align: right; margin-bottom: 10px;" class="no-print">
      <button onclick="addProjectToSection('projects-section-${sectionCount}')">➕ New project</button>
    </div>
  `;
  container.appendChild(section);
}

function editProfilePic() {
  const img = document.getElementById("profile-pic");
  const newSrc = prompt("Enter new image URL:", img.src);
  if (newSrc && newSrc.trim() !== "") {
    img.src = newSrc.trim();
  }
}

function addProjectToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const count = section.querySelectorAll(".project-box").length + 1;
  const box = document.createElement("div");
  box.className = "project-box";
  box.innerHTML = `
    <h3>
      <span id="${sectionId}-title-${count}">Project ${count}</span>
      <span style="margin-right: 10px; direction: ltr; unicode-bidi: isolate;">
        (<span id="${sectionId}-date-${count}">2020 - 2022</span>)
        <span class="edit-button">
          <button onclick="editField('${sectionId}-date-${count}')">✏️</button>
          <button onclick="togglePrintVisibility(this)">🙈</button>
        </span>
      </span>
      <span class="edit-button">
        <button onclick="editField('${sectionId}-title-${count}')">✏️</button>
        <button onclick="deleteElement(this)">🗑️</button>
        <button onclick="togglePrintVisibility(this)">🙈</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </h3>
    <p>
      <span id="${sectionId}-desc-${count}">Project description...</span>
      <span class="edit-button">
        <button onclick="editField('${sectionId}-desc-${count}')">✏️</button>
        <button onclick="togglePrintVisibility(this)">🙈</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </p>
    <p>
      <strong>Tech:</strong> <span id="${sectionId}-tech-${count}">Python, Flask</span>
      <span class="edit-button">
        <button onclick="editField('${sectionId}-tech-${count}')">✏️</button>
        <button onclick="togglePrintVisibility(this)">🙈</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </p>
    <p>
      🔗 <span id="${sectionId}-link-${count}"><a href="#">Project link</a></span>
      <span class="edit-button">
        <button onclick="editLink('${sectionId}-link-${count}')">✏️</button>
        <button onclick="togglePrintVisibility(this)">🙈</button>
        <button onclick="moveUp(this)">⬆️</button>
        <button onclick="moveDown(this)">⬇️</button>
      </span>
    </p>
  `;
  section.appendChild(box);
}