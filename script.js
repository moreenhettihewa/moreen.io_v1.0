const totalPages = 6;

let currentFlippedPage = 0;

function createClips(containerId, sideClassName, count = 13) {
  const containerClip = document.getElementById(containerId);
  if (!containerClip) return;

  for (let i = 0; i < count; i++) {
    const sideElement = document.createElement("div");
    sideElement.className = sideClassName;
    containerClip.appendChild(sideElement);
  }
}

function renderClipContainer() {
  createClips("clips", "arc");
}


function addPageHoles(holeCount = 13) {
  const pages = document.getElementsByClassName("page");
  for (const page of pages) {
    const pageHolesContainerElement = document.createElement("div");
    pageHolesContainerElement.className = "page__holes";

    for (let h = 0; h < holeCount; h++) {
      const holeElement = document.createElement("div");
      holeElement.className = "hole";
      pageHolesContainerElement.appendChild(holeElement);
    }
    page.appendChild(pageHolesContainerElement);
  }
}

function reorderPages() {
  const pages = document.querySelectorAll(".page");
  const total = pages.length;

  pages.forEach((page, index) => {
    const i = index + 1;
    // Bring unflipped pages to top
    if (i <= currentFlippedPage) {    
      page.style.zIndex = i;
    } else {
      page.style.zIndex = total - i + 50;
    }
  });
}

function goToPage(target) {
  for (let i = 1; i <= totalPages; i++) {
    const page = document.getElementById("page" + i);
    if (i <= target) {
      page.classList.toggle('flipped');
    } else {
      page.classList.remove("flipped");
    }
  }
  currentFlippedPage = target;

  reorderPages();
}

// Navigate to each page and the contents are loaded via a separate HTML page
function loadCoverIcon() {
  const link = document.getElementById("coverpageIcon");
  fetch("./shared/coverpage-icon/coverpage-icon.html")
  .then((resp)=> resp.text())
  .then((data)=>{
    link.innerHTML = data
  });
}

function loadTemplateFromFile(file, templateId) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(templateId).innerHTML = html;
    });
}

// Render everything
renderClipContainer();
addPageHoles();
loadCoverIcon();

// reordering the pages on reload
window.onload = () => {
  reorderPages();
};