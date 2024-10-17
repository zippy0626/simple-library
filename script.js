// Storage
let myLibrary = [];

// Book Object
function Book(title, author, pages, isRead, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.image = image;
}

// Example Books
const book1 = new Book("Example 1", "John Doe", 200, "yes");
const book2 = new Book("Example 2", "John Doe", 200, "no");
const book3 = new Book("Example 3", "John Doe", 200, "no");
const book4 = new Book("Example 4", "John Doe", 200, "yes");
const book5 = new Book("Example 5", "John Doe", 200, "yes");

const exampleBooks = [book1, book2, book3, book4, book5]
exampleBooks.forEach((book) => {
  myLibrary.push(book)
});

// BOOK CONTAINER
const bookContainer = document.querySelector('.book-section');

function removeAllBooks() {
  bookContainer.innerHTML = "";
}

function showAllBooks() {
  myLibrary.forEach((book) => {
    addBookToDOM(book)
  });
}
showAllBooks()

// ADD BOOK TO DOM
function addBookToDOM(bookObj) {
  const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    // set index number based on array bookObj is in
    bookElement.dataset.indexNumber = myLibrary.indexOf(bookObj)
    
    // Image functionality, makes src path
    let bookImgSrc = "";
    if (bookObj.image) {
      bookImgSrc = URL.createObjectURL(bookObj.image);
    }

    bookElement.innerHTML = `
    <div class="book-img-container">
      <img src="${bookImgSrc}" alt="book cover">
    </div>

    <div class="book-desc">
      <p class="book-title" aria-label="book-title">${bookObj.title}</p>
      <p class="book-author" aria-label="book-author">${bookObj.author}</p>
      <p class="book-pages" aria-label="book-pages">${bookObj.pages} pages</p>

      <div class="book-actions">
        <div>
          <p class="book-read-now book-action-text">Read Now</p>
        </div>

        ${bookObj.isRead === "yes" ?
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

        <div onclick="showConfirmDelModal(this)">
          <p class="book-delete book-action-text">Delete</p>
        </div>
      </div>
    </div>
    `
    bookContainer.appendChild(bookElement)
}


// ADD NEW BOOK via MODAL FORM
function addNewBook(title, author, pages, isRead, image) {
  const newBook = new Book(title, author, pages, isRead, image);
  
  console.log(newBook);

  addBookToDOM(newBook)

  myLibrary.push(newBook)

  resetInputs()
}


// ADD BOOK MODAL FUNCTIONALITY
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


// GET FORM INFORMATION
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const bookTitle = formData.get("bookTitle");
  const bookAuthor = formData.get("bookAuthor");
  let bookPages = formData.get("bookPages");
  let isRead = formData.get("isRead");
  const image = formData.get("bookImg");

  if (bookPages.slice(0, 1) === "0" || !bookPages || bookPages < 0) {
    bookPages = "?";
  }
  if (isRead === null) {
    isRead = "no"
  }

  addNewBook(bookTitle, bookAuthor, bookPages, isRead, image);

  hideModal()
});


// TOGGLE MARK READ/ALREADY READ
// gets element from "this" keyword in HTML
function toggleReadStatus(element) {

  // Get Index of closest book ele
  const bookElement = element.closest('.book');
  let bookIndex = bookElement.dataset.indexNumber
  
  // Get nearest read status elements
  const markAsRead = bookElement.querySelector('.contain-book-mark-read');
  const alreadyRead = bookElement.querySelector('.contain-book-already-read');

  // Update Object based on it's own index in array
  if (myLibrary[bookIndex].isRead === "yes") {
    myLibrary[bookIndex].isRead = "no";
  } else if (myLibrary[bookIndex].isRead === "no") {
    myLibrary[bookIndex].isRead = "yes"
  } else if (myLibrary[bookIndex].isRead === null) {
    myLibrary[bookIndex].isRead = "yes"
  }

  // Toggle hidden class for both
  markAsRead.classList.toggle('hidden');
  alreadyRead.classList.toggle('hidden');
}


// REMOVE BOOK + CONFIRM DELETE MODAL
const confirmDeleteModal = document.querySelector('.modal-confirm-delete'); 
const confirmYesBtn = document.querySelector('.confirm-yes-btn');
const confirmCancelBtn = document.querySelector('.confirm-cancel-btn');

const confirmModOverlay = document.querySelector('.confirm-modal-overlay');

// Capture the clicked element with outside variable when Modal Confirm Button is clicked
let currentBookElement = undefined;
function showConfirmDelModal(element) {
  confirmDeleteModal.classList.remove("hidden")
  confirmModOverlay.classList.remove("hidden")

  currentBookElement = element.closest(".book")
}

function hideConfirmDelModal() {
  confirmDeleteModal.classList.add("hidden")
  confirmModOverlay.classList.add("hidden")
}
// If user clicks blur overlay it cancels modal
confirmModOverlay.addEventListener('click', hideConfirmDelModal);

function removeBook() {
  let bookIndex = Number(currentBookElement.dataset.indexNumber)
  
  if (bookIndex === undefined || bookIndex === null) {
    alert("Book index is not found.");
    return;
  } else if (myLibrary[bookIndex]) {
    myLibrary[bookIndex] = undefined
  }

  currentBookElement.remove()
  hideConfirmDelModal()
}
confirmYesBtn.addEventListener('click', removeBook)


// RECENTLY READ BOOK TAB BUTTON
const recentlyReadTabBtn = document.querySelector('.recently-read');

