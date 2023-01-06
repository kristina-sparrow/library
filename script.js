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
  renderTable();
  clearForm();
}

function changeStatus() {}

function deleteBook() {
  library.splice(currentBook, 1);
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

function renderTable() {
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
}

renderTable();
