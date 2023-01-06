let library = [];
const defaultData = [
  {
    title: "Eloquent JavaScript: A Modern Introduction to Programming",
    author: "Marijn Haverbeke",
    skill: "JavaScript",
    status: "unread",
  },
  {
    title: "The Principles of Object-Oriented JavaScript",
    author: "Nicholas C. Zakas",
    skill: "JavaScript",
    status: "read",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    skill: "JavaScript",
    status: "read",
  },
];
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const skill = document.querySelector("#skill");
const status = document.querySelector("#status");

function Book(title, author, skill, status) {
  this.title = title;
  this.author = author;
  this.skill = skill;
  this.status = status;
}

function addBookToLibrary() {
  const newBook = new Book(
    title.value,
    author.value,
    skill.value,
    status.value
  );
  library.push(newBook);
  updateLibrary();
}

function updateLibrary() {
  // loop through array and add books to page
}
