let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "already read" : "not read yet."
      }`
    );
  };
}

// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true);

function addBookToLibrary(title, author, pages, read) {
  //   const newBook = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, true);
addBookToLibrary("Anna Karenina", "Leo Tolstoy", 1878, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, false);
addBookToLibrary("The Great Gatsby", "Leo Tolstoy", 1920, true);
addBookToLibrary(
  "One Hundred Years of Solitude",
  "Gabriel García",
  1967,
  false
);
addBookToLibrary("A Passage to India", "E.M. Forster", 1924, true);
addBookToLibrary("Invisible Man", "H.G. Wells", 1828, false);
// console.log(myLibrary);

let list = document.getElementById("myList");

function loadBooks() {
  // list.removeChild(list.firstChild);
  myLibrary.forEach((book, index) => {
    let nBook = document.createElement("tr");
    nBook.innerHTML = `<td scope="row">${book.title}</td> <td>${
      book.author
    }</td> <td>${
      book.pages
    }</td> <td data-id="${index}" onClick="updateBook(this)">
    <input type="checkbox" ${book.read ? "Checked" : ""} >
    ${
      book.read ? "Yes" : "No"
    }</td><td class="deleteBook"  data-id="${index}" role="button" onClick="removeBook(this)">X</td>`;
    list.appendChild(nBook);
  });
}
loadBooks();

// New book Adding
function formProcess(e) {
  console.log("works");
  e.preventDefault();
}

document.getElementById("newBookForm").addEventListener("submit", (e) => {
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = parseInt(e.target.pages.value);
  const read = e.target.readOrNot.value === "true" ? true : false;

  addBookToLibrary(title, author, pages, read);

  let nBook = document.createElement("tr");

  nBook.innerHTML = `<td scope="row">${title}</td> <td>${author}</td> <td>${pages}</td> <td data-id="${
    myLibrary.length - 1
  }" onClick="updateBook(this)"><input type="checkbox" ${
    read ? "Checked" : ""
  } >${read ? "Yes" : "No"}</td><td class="deleteBook"  data-id="${
    myLibrary.length - 1
  }" role="button" onClick="removeBook(this)">X</td>`;
  list.appendChild(nBook);

  e.preventDefault();
  console.log(myLibrary);
});

// Removing a book

function removeBook(e) {
  const dID = parseInt(e.dataset.id);
  myLibrary.splice(dID, 1);
  document.getElementById("myList").innerHTML = "";
  loadBooks();
  console.log(myLibrary);
  // the following is not required as we are reloading table content with updated array
  // e.parentNode.remove();
}

//  I am not using the following because it doesn't work with newly added books
document.querySelectorAll(".deleteBook").forEach((dBook) => {
  dBook.addEventListener("click", () => {
    // const dID = parseInt(dBook.dataset.id);
    // myLibrary.splice(dID, 1);
    // document.getElementById("myList").innerHTML = "";
    // loadBooks();
    // document.querySelector(`[data-id="${dID}"]`).parentNode.remove();
    // console.log(myLibrary);
  });
});

// Update Read Status

function updateBook(e) {
  const dID = parseInt(e.dataset.id);
  // console.log(dID);

  myLibrary[dID].read = !myLibrary[dID].read;

  document.getElementById("myList").innerHTML = "";
  loadBooks();
  console.log(myLibrary);
}
