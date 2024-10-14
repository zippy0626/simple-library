// Storage
const myLibrary = [];

// Book Object
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const book1 = new Book("A", "Niggaman", 320, false);
myLibrary.push(book1)

function addNewBook() {
  
}

function removeBook() {
    
}

// Call this at start of website
// Use myLibrary array index to add index as DOM element attribute
function showAllBooks() {
    
}