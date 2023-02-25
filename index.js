import defaultData from "./data/data.js";

// DECLARATIONS
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const skillInput = document.querySelector("#skill");
const readStatusInput = document.querySelector("#read-status");
const readStat = document.querySelector("#num-books-read");
const readingStat = document.querySelector("#num-books-reading");
const unreadStat = document.querySelector("#num-books-unread");
const tableBody = document.querySelector("#library-data");
const table = document.querySelector(".table");
const form = document.querySelector(".form");
let library = [];

class Book {
  constructor(title, author, skill, readStatus) {
    this.title = title;
    this.author = author;
    this.skill = skill;
    this.readStatus = readStatus;
  }
}

// FUNCTIONS
function checkLocalStorage() {
  library = JSON.parse(localStorage.getItem("library")) || defaultData;
}

function updateStats() {
  let booksRead = 0;
  let booksUnread = 0;
  let booksReading = 0;
  library.forEach((book) => {
    switch (book.readStatus) {
      case "Read":
        booksRead++;
        break;
      case "Currently Reading":
        booksReading++;
        break;
      case "To Be Read":
        booksUnread++;
        break;
      default:
        break;
    }
  });
  readStat.textContent = booksRead;
  readingStat.textContent = booksReading;
  unreadStat.textContent = booksUnread;
}

function renderData() {
  checkLocalStorage();
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
      <tr data-index="${library.indexOf(book)}">
        <td class="left">${book.title}</td>
        <td class="left">${book.author}</td>
        <td class="left">${book.skill}</td>
        <td class="left"><div class="dropdown"><button class="btn btn-status">${
          book.readStatus
        }<i class="fa-solid fa-caret-down"></i></button><div class="status-dropdown"><a class="status-option">Read</a><a class="status-option">Currently Reading</a><a class="status-option">To Be Read</a></div></td>
        <td class="center"><i class="fa-solid fa-xmark btn-delete"></i></td>
      </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
  updateStats();
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  skillInput.value = "";
  readStatusInput.value = "";
}

function addBook() {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    skillInput.value,
    readStatusInput.value
  );
  library.push(newBook);
  renderData();
  clearForm();
}

function deleteBook(index) {
  library.splice(index, 1);
  renderData();
}

function changeStatus(index, newStatus) {
  library[index].readStatus = newStatus;
  renderData();
}

// EVENT HANDLERS
function handleDeleteClick(e) {
  if (e.target.classList.contains("btn-delete")) {
    const currentTitle = e.target.parentNode.parentNode.childNodes[1];
    if (
      window.confirm(
        `Are you sure you want to delete "${currentTitle.innerText}"?`
      )
    ) {
      const currentIndex =
        e.target.parentNode.parentNode.getAttribute("data-index");
      deleteBook(currentIndex);
    }
  }
}

function handleStatusBtnClick(e) {
  if (e.target.classList.contains("btn-status")) {
    e.target.nextSibling.classList.toggle("show");
  }
}

function handleStatusChange(e) {
  if (e.target.classList.contains("status-option")) {
    const newStatus = e.target.textContent;
    const currentIndex =
      e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
    changeStatus(currentIndex, newStatus);
  }
}

function closeDropdowns() {
  const dropdowns = document.getElementsByClassName("status-dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
    const openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

// INIT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

window.onclick = function (e) {
  if (!e.target.matches(".btn-status")) {
    closeDropdowns();
  }
};

table.addEventListener("click", handleDeleteClick);
table.addEventListener("click", handleStatusBtnClick);
table.addEventListener("click", handleStatusChange);

renderData();
