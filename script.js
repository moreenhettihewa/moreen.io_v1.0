const totalPages = 5;
let currentFlippedPage = 0;

const container = document.getElementById("clipsContainer");

const width_of_book = document.getElementsByClassName("book")[0].scrollWidth;

const number_of_clips = (width_of_book) / 28;
for (let i = 0; i < number_of_clips; i++) {
  const clip = document.createElement("div");
  clip.className = "clip";
  container.appendChild(clip);

  const clip_bind = document.createElement("div");
  clip_bind.className = "clip";
  container.appendChild(clip_bind);

  const clip_hole = document.createElement("div");
  clip_hole.className = "clip_hole";
  container.appendChild(clip_hole);
}

function goToPage(target) {
  for (let i = 1; i <= totalPages; i++) {
    const page = document.getElementById("page" + i);
    if (i <= target) {
      page.classList.add("flipped");
    } else {
      page.classList.remove("flipped");
    }
  }
  currentFlippedPage = target;

  reorderPages();
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
      page.style.zIndex = total - i + 1;
    }
  });
}

function reorderPage() {
  flippedPages = [];
  const pages = document.querySelectorAll(".page");
  pages.forEach((page, index) => {
    page.classList.remove("flipped");
    page.style.zIndex = pages.length - index;
  });
}

// Navigate to each page and the contents are loaded via a separate HTML page

function loadExperience() {
  fetch("./pages/experience/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page2")
        .getElementsByClassName("front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function loadContributedProjects() {
  fetch("./pages/contributed_projects/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page4")
        .getElementsByClassName("front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function loadPersonalProjects() {
  fetch("./pages/personal_projects/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page3")
        .getElementsByClassName("front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function loadContacts() {
  fetch("./pages/contacts/index.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("page5")
        .getElementsByClassName("front")[0].innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

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


const magnifier = document.getElementById("magnifier");

const scale = 2;

document.querySelectorAll(".zoomable").forEach(target => {
  target.addEventListener("mousemove", (e) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magnifier.style.display = "block";
    magnifier.style.left = `${e.pageX - magnifier.offsetWidth / 2}px`;
    magnifier.style.top = `${e.pageY - magnifier.offsetHeight / 2}px`;

    // Clear previous content
    magnifier.innerHTML = "";

    const clone = target.cloneNode(true);
    clone.classList.add("magnifier-content");

    // Position the zoomed content so that the area under the cursor is centered
    clone.style.left = `${-x * scale + magnifier.offsetWidth / 2}px`;
    clone.style.top = `${-y * scale + magnifier.offsetHeight / 2}px`;

    magnifier.appendChild(clone);
  });

  target.addEventListener("mouseleave", () => {
    magnifier.style.display = "none";
    magnifier.innerHTML = "";
  });
});

function loadPersonalProjectCards(){
   fetch("../../shared/project_card/index.html")
            .then((response) => response.text())
            .then((data) => {
                document
                    .getElementsByClassName("project__description")[0].innerHTML = data;
            })
            .catch((error) => console.error("Error loading content:", error));
}