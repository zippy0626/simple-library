// Storage
const myLibrary = [];

// Book Object
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  // this.image = image;
}


// MODAL FUNCTIONALITY
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const cancelBtn = document.querySelector(".cancel-btn");
const addNewBookTabBtn = document.querySelector(".add-new-book");

function showModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
addNewBookTabBtn.addEventListener("click", showModal);

function hideModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function resetInputs() {
  const modal = document.querySelector(".modal");
  const modalInputs = modal.querySelectorAll("input");
  for (let input of modalInputs) {
    if (input.type === "text" || input.type === "number") {
      input.value = "";
    } else if (input.type === "radio") {
      input.checked = false;
    } 
  }
}
cancelBtn.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", resetInputs);


// Get form information
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const bookTitle = formData.get("bookTitle");
  const bookAuthor = formData.get("bookAuthor");
  let bookPages = formData.get("bookPages");
  const isRead = formData.get("isRead");
  const bookImg = formData.get("bookImg");

  console.log(`value of isRead: ${isRead}`);

  if (bookPages.slice(0, 1) === "0" || !bookPages) {
    bookPages = "?";
  }

  console.log(bookTitle, bookAuthor, bookPages, isRead);

  addNewBook(bookTitle, bookAuthor, bookPages, isRead);

  // On Add Book, hide modal
  hideModal()
});


// Make new Book Object
// Make new DOM element book
// Use temperate literal string and add innerHTML variables
function addNewBook(bookTitle, bookAuthor, bookPages, isRead) {
  const newBook = new Book(bookTitle, bookAuthor, bookPages, isRead);

  myLibrary.push(newBook)

  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.dataset.indexNumber = myLibrary.indexOf(newBook); //Assign index to HTML .book element
  bookElement.innerHTML = `
    <div class="book-img-container">
      <img src="" alt="book cover">
    </div>

    <div class="book-desc">
      <p class="book-title" aria-label="book-title">${newBook.title}</p>
      <p class="book-author" aria-label="book-author">${newBook.author}</p>
      <p class="book-pages" aria-label="book-pages">${newBook.pages} pages</p>

      <div class="book-actions">
        <div>
          <p class="book-read-now book-action-text">Read Now</p>
        </div>

        ${newBook.isRead === "yes" ?
        `<div class="contain-book-already-read" onclick="toggleReadStatus(this)">
          <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
          <p class="book-mark-read book-action-text">Already Read</p>
        </div>

        <div class="contain-book-mark-read hidden" onclick="toggleReadStatus(this)">
          <p class="book-mark-read book-action-text">Mark as Read</p>
        </div>`
        :
        `<div class="contain-book-already-read hidden" onclick="toggleReadStatus(this)">
          <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
          <p class="book-mark-read book-action-text">Already Read</p>
        </div>
        
        <div class="contain-book-mark-read" onclick="toggleReadStatus(this)">
          <p class="book-mark-read book-action-text">Mark as Read</p>
        </div>`
        }

        <div>
          <p class="book-delete book-action-text">Delete</p>
        </div>
      </div>
    </div>
  `;

  const bookSection = document.querySelector('.book-section');
  bookSection.appendChild(bookElement)
  resetInputs()
}


// TOGGLE MARK READ/ALREADY READ IN LINE HTML
function toggleReadStatus(element) {// this keyword in HTML 
  
  // Find the nearest .book element (the parent container for the current book)
  const bookElement = element.closest('.book');
  
  // Get nearest read status elements
  const markAsRead = bookElement.querySelector('.contain-book-mark-read');
  const alreadyRead = bookElement.querySelector('.contain-book-already-read');

  // Toggle hidden class for both
  markAsRead.classList.toggle('hidden');
  alreadyRead.classList.toggle('hidden');
}

function removeBook() {}

// Call this at start of website
// Use myLibrary array index to add index as DOM element attribute
function showAllBooks() {}