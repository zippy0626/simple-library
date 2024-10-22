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
const book1 = new Book("Bold Beginnings", "Benny Barker", 200, "yes");
const book2 = new Book("Turbulent Times", "Tara Thompson", 200, "no");
const book3 = new Book("Curious Chronicles", "Cathy Catherwood", 200, "no");
const book4 = new Book("Amazing Adventures", "Annie Anderson", 200, "yes");
const book5 = new Book("Heroic Heights", "Harry Henderson", 200, "no");
const book6 = new Book("Silent Secrets", "Sally Sanders", 200, "no");
const book7 = new Book("Daring Decisions", "Damian Davis", 200, "yes");
const book8 = new Book("Shifting Shadows", "Shawn Sherwood", 200, "yes");

const exampleBooks = [book1, book2, book3, book4, book5, book6, book7, book8]
exampleBooks.forEach((book) => {
  myLibrary.push(book)
});


// SEARCH BAR INPUT STRING FOR SEARCH BAR FUNCTIONALITY
let searchResultNotFoundMsg = document.querySelector('.search-result-not-found');


// BOOK CONTAINER
const bookContainer = document.querySelector('.book-section');
const yourBooksTab = document.querySelector('.your-books');
yourBooksTab.addEventListener('click', () => {
  noBooksHereMsg.classList.add('hidden')
  removeAllBooks()
  showAllBooks()
});

function removeAllBooks() {
  bookContainer.innerHTML = "";
}

function showAllBooks() {
  searchResultNotFoundMsg.classList.add("hidden")

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
    } else if (bookObj.image===undefined) {
      bookImgSrc = "assets/icons/recentlyRead.svg"
    } 

    bookElement.innerHTML = `
    <div class="book-img-container">
      <img src="${bookImgSrc}" alt="book cover" class="book-image">
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

    // If no Image set default image
    if (bookObj.image===undefined) {
      const bookImage = bookElement.querySelector('.book-image');
      bookImage.style.width = "50%"
      bookImage.style.height = "50%"
      bookImage.style.top = "50%"
      bookImage.style.left = "50%"
      bookImage.style.transform = "translate(-50%, -50%)"
      bookImage.style.opacity = ".05"
    }

    bookContainer.appendChild(bookElement)
}


// ADD NEW BOOK via MODAL FORM
function addNewBook(title, author, pages, isRead, image) {
  const newBook = new Book(title, author, pages, isRead, image);
  
  console.log(newBook);

  myLibrary.push(newBook)

  addBookToDOM(newBook)

  resetInputs()
}


// ADD BOOK MODAL FUNCTIONALITY
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const cancelBtn = document.querySelector(".cancel-btn");
const addNewBookTabBtn = document.querySelector(".add-new-book");

function showModal() {
  searchResultNotFoundMsg.classList.add("hidden")
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


// REMOVE SINGLE BOOK + CONFIRM DELETE MODAL
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
const noBooksHereMsg = document.querySelector('.no-books-here-msg');

function showRecentlyRead() {
  removeAllBooks()
  searchResultNotFoundMsg.classList.add("hidden")

  // Copy from myLibrary
  // If isRead is changed in MyLibrary this will always update
  let myLibraryCopy = Array.from(myLibrary);
  
  if (myLibraryCopy.length) {
    myLibraryCopy.forEach((book) => {
      if (book.isRead==='yes') {
        addBookToDOM(book)
      }
    });
  }

  if (!bookContainer.innerHTML) {
    noBooksHereMsg.classList.remove('hidden')
  } else {
    noBooksHereMsg.classList.add('hidden')
  }
}
recentlyReadTabBtn.addEventListener('click', showRecentlyRead);


// SEARCH BAR FUNCTIONALITY
const searchBar = document.querySelector('#search-bar');
const searchIcon = document.querySelector('[for="search-bar"]');

function searchBook() {
  // this will update every time
  // this is for the not found message
  let searchResultNotFoundMsg = document.querySelector('.search-result-not-found');
  
  const searchValue = searchBar.value.trim().toLowerCase(); //string
  const seperatedSearchWords = searchValue.split(" "); //array
  let SRCurrentClassList = searchResultNotFoundMsg.classList //domtokenlist
  
  if (!searchValue && SRCurrentClassList.contains("hidden")) {
    removeAllBooks()
    SRCurrentClassList.remove("hidden")
    return;
  }
  if (!searchValue && !SRCurrentClassList.contains("hidden")) {
    removeAllBooks()
    SRCurrentClassList.add("hidden")
    showAllBooks()
    return;
  }
  if (searchValue.length <= 1 || !searchValue) {
    console.log("Invalid Search Result");
    return;
  }

  let matchedBooks = []

  for (const book of myLibrary) {
    const bookTitle = book.title.toLowerCase()
    const bookAuthor = book.author.toLowerCase()

    for (const searchWord of seperatedSearchWords) {
      if (bookTitle.includes(searchWord) || bookAuthor.includes(searchWord)) {
        matchedBooks.push(book)
        break;
      }
    }
  }

  if (matchedBooks.length) {
    removeAllBooks()

    for (const book of matchedBooks) {
      addBookToDOM(book)
    }
  } else {
    removeAllBooks()
    searchResultNotFoundMsg.classList.remove("hidden")
  };
}
searchBar.addEventListener('keydown', (e) => {
  const pressedKey = e.key;

  if (pressedKey==="Enter") {
    e.preventDefault()
    searchBook()
    return;
  }
});