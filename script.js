const totalPages = 5;

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

function loadExperience() {
  setTimeout(() => {
    fetch("./pages/experience/index.html")
      .then((response) => response.text())
      .then((data) => {
        document
          .getElementById("page2")
          .getElementsByClassName("page__front")[0].innerHTML = data;
      })
      .catch((error) => console.error("Error loading content:", error));
  }, 100); // 2000 ms = 2 seconds
}

function loadContributedProjects() {
  fetch("./pages/contributed_projects/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page4")
        .getElementsByClassName("page__front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function loadPersonalProjects() {
  fetch("./pages/personal_projects/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page3")
        .getElementsByClassName("page__front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function loadContacts() {
  fetch("./pages/contacts/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page5")
        .getElementsByClassName("page__front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Render everything
renderClipContainer();
addPageHoles();


// reordering the pages on reload
window.onload = () => {
  reorderPages();
};



function closeModal(event) {
  const modal = document.getElementById("modalOverlay");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function viewContentWindow(page) {
  const modal = document.getElementById("modalOverlay");
  const modalContent = modal.querySelector(".modal-content");

  // Clone the original contact content
  const original = document.getElementById(page).querySelector(".content-page").cloneNode(true);

  // Remove onclick from the clone to prevent recursive modals
  original.removeAttribute("ondblclick");

  // Insert the cloned content
  modalContent.innerHTML = ""; // Clear previous if any
  modalContent.appendChild(original);

  modal.style.display = "block";
}

function loadPersonalProjectCards(){
   fetch("../../shared/project_card/index.html")
            .then((response) => response.text())
            .then((data) => {
                document
                    .getElementsByClassName("project__description")[0].innerHTML = data;
            })
            .catch((error) => console.error("Error loading content:", error));
}