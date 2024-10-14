// Storage
const myLibrary = [];

// Book Object
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addNewBook() {
  
}

function removeBook() {
    
}

// Call this at start of website
// Use myLibrary array index to add index as DOM element attribute
function showAllBooks() {
    
}


// Show and Hide Modal
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const cancelBtn = document.querySelector('.cancel-btn');
const addNewBookBtn = document.querySelector('.add-new-book');

function showModal() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
addNewBookBtn.addEventListener('click', showModal);

function hideModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
cancelBtn.addEventListener('click', hideModal);