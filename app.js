let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet."}`);
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
addBookToLibrary("One Hundred Years of Solitude", "Gabriel García", 1967, false);
addBookToLibrary("A Passage to India", "E.M. Forster", 1924, true);
addBookToLibrary("Invisible Man", "H.G. Wells", 1828, false);
// console.log(myLibrary);

let list = document.getElementById("myList");

function loadBooks() {
  // list.removeChild(list.firstChild);
  myLibrary.forEach((book, index) => {
    let nBook = document.createElement("tr");
    nBook.innerHTML = `<td scope="row">${book.title}</td> <td>${book.author}</td> <td>${book.pages}</td> <td data-id="${index}" onClick="updateBook(this)">
    <input type="checkbox" ${book.read ? "Checked" : ""} >
    ${book.read ? "Yes" : "No"}</td><td class="deleteBook"  data-id="${index}" role="button" onClick="removeBook(this)">X</td>`;
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

  nBook.innerHTML = `<td scope="row">${title}</td> <td>${author}</td> <td>${pages}</td> <td data-id="${myLibrary.length - 1}" onClick="updateBook(this)"><input type="checkbox" ${read ? "Checked" : ""} >${read ? "Yes" : "No"}</td><td class="deleteBook"  data-id="${myLibrary.length - 1}" role="button" onClick="removeBook(this)">X</td>`;
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

/* Constraint Validation */

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementById("newBookForm");

const email = document.getElementById("title");
const emailError = document.querySelector("#authorEmail + span.error");

email.addEventListener("input", function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.innerHTML = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", function (event) {
  // if the form contains valid data, we let it submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address
    // display the following error message.
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}
