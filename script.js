let library = [];
const defaultData = [
  {
    title: "Eloquent JavaScript: A Modern Introduction to Programming",
    author: "Marijn Haverbeke",
    skill: "JavaScript",
    readStatus: "Currently Reading",
  },
  {
    title: "The Principles of Object-Oriented JavaScript",
    author: "Nicholas C. Zakas",
    skill: "JavaScript",
    readStatus: "Read",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    skill: "JavaScript",
    readStatus: "To Be Read",
  },
];

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const skill = document.querySelector("#skill");
const readStatus = document.querySelector("#read-status");
const readStat = document.querySelector("#num-books-read");
const readingStat = document.querySelector("#num-books-reading");
const unreadStat = document.querySelector("#num-books-unread");
const tableBody = document.querySelector("#library-data");
const form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

function Book(title, author, skill, readStatus) {
  this.title = title;
  this.author = author;
  this.skill = skill;
  this.readStatus = readStatus;
}

function addBook() {
  const newBook = new Book(
    title.value,
    author.value,
    skill.value,
    readStatus.value
  );
  library.push(newBook);
  renderData();
  clearForm();
}

function getCurrentBook() {
  let currentBook;
  return currentBook;
}

function changeStatus() {}

function deleteBook() {
  library.splice(currentBook, 1);
  renderData();
}

function clearForm() {
  title.value = "";
  author.value = "";
  skill.value = "";
  readStatus.value = "";
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = defaultData;
  }
}

function renderData() {
  checkLocalStorage();
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.skill}</td>
        <td><button class="status-button">${book.readStatus}</button></td>
        <td><button class="delete-button">Delete</button></td>
      </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
  updateStats();
}

function updateStats() {
  let booksRead = 0;
  let booksUnread = 0;
  let booksReading = 0;
  for (book of library)
    if (book.readStatus === "Read") {
      booksRead += 1;
    } else if (book.readStatus === "Currently Reading") {
      booksReading += 1;
    } else if (book.readStatus === "To Be Read") {
      booksUnread += 1;
    }
  readStat.textContent = booksRead;
  readingStat.textContent = booksReading;
  unreadStat.textContent = booksUnread;
}

renderData();
