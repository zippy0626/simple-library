class Book {
  constructor(title, author, pages, isRead, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this._isRead = isRead;
    this.image = image;
  }

  get isRead() {
    return this._isRead;
  }

  set isRead(bool) {
    this._isRead=bool;
  }
}

const book1 = new Book("Bold Beginnings", "Benny Barker", 200, true);
const book2 = new Book("Turbulent Times", "Tara Thompson", 200, false);
const book3 = new Book("Curious Chronicles", "Cathy Catherwood", 200, false);
const book4 = new Book("Amazing Adventures", "Annie Anderson", 200, true);
const book5 = new Book("Heroic Heights", "Harry Henderson", 200, false);
const book6 = new Book("Silent Secrets", "Sally Sanders", 200, false);
const book7 = new Book("Daring Decisions", "Damian Davis", 200, true);
const book8 = new Book("Shifting Shadows", "Shawn Sherwood", 200, true);

let books = [book1, book2, book3, book4, book5, book6, book7, book8, ]

class Library {
  constructor(name) {
    this._name = name;
    this._bookStorage = [];
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get bookStorage() {
    return this._bookStorage;
  }

  addToStorage(book) {//obj or array
    let books = Array.isArray(book) ? book : [book];

    books.forEach((book) => {
        this._bookStorage.push(book)
    })
  }

  removeFromStorage(bookTitle) {//str
    let title = bookTitle ? 
      bookTitle.toLowerCase().trim() : 
      console.log("Provide a Book Title!") 

    this._bookStorage = this._bookStorage.filter((book) => 
      !book.title.toLowerCase().includes(title)
    );
  }

  removeAllStorage() {
    this._bookStorage = [];
  }

  getIndexOf(bookSearchWords) {//str
    let searchWords = bookSearchWords //str
      .toLowerCase()
      .replace(/\s/g, "");
    
    return this._bookStorage.findIndex((book) => {
      let bookTitleAndAuthor = 
        book.title.toLowerCase().replace(/\s/g, "") + 
        book.author.toLowerCase().replace(/\s/g, "");

      return bookTitleAndAuthor.includes(searchWords)
    });
  }

  getFromStorage(index) {
    return this._bookStorage[index];
  }

  getRecentlyRead() {
    return this._bookStorage
      .filter((book) => book._isRead)
  }
}

const myLibrary = new Library("test");
myLibrary.addToStorage(books)


//Module
const DOMManager = (function() {
  function select(selector) {//str
    if (!selector) return;
    return document.querySelector(selector);
  }

  function setText(selector, newText) {//str, str
    const element = document.querySelector(selector);
    if (element) element.textContent = newText;
  }

  function emptyInnerHTML(selector) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = "";
  }
  
  function toggleHidden(selector) {//str
    const element = select(selector);
    if (element) element.classList.toggle('hidden');
  }

  function appendBookTo(selector, book) {//str, obj
    const outerElement = select(selector);

    if (!outerElement || !book) return;

    const bookTitle = book.title
    const bookAuthor = book.author
    const bookPages = book.pages
    const bookIsRead = book.isRead
    let bookImg = book.image

    let bookImgSrc;
    if (!bookImg) bookImgSrc = "assets/icons/recentlyRead.svg";

    const bookElement = document.createElement('div');
      bookElement.classList.add("book");
      bookElement.dataset.indexNumber = myLibrary.bookStorage.indexOf(book);

      bookElement.innerHTML = `
        <div class="book-img-container">
          <img src="${bookImgSrc}" alt="book cover" class="book-image">
        </div>

        <div class="book-desc">
          <p class="book-title" aria-label="book-title">${bookTitle}</p>
          <p class="book-author" aria-label="book-author">${bookAuthor}</p>
          <p class="book-pages" aria-label="book-pages">${bookPages} pages</p>

          <div class="book-actions">
            <div>
              <p class="book-read-now book-action-text">Read Now</p>
            </div>

            ${bookIsRead ?
            `<div class="contain-book-already-read" onclick="">
              <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
              <p class="book-mark-read book-action-text">Already Read</p>
            </div>

            <div class="contain-book-mark-read hidden" onclick="">
              <p class="book-mark-read book-action-text">Mark as Read</p>
            </div>`
            :
            `<div class="contain-book-already-read hidden" onclick="">
              <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
              <p class="book-mark-read book-action-text">Already Read</p>
            </div>
            
            <div class="contain-book-mark-read" onclick="">
              <p class="book-mark-read book-action-text">Mark as Read</p>
            </div>`
            }

            <div onclick="">
              <p class="book-delete book-action-text">Delete</p>
            </div>
          </div>
        </div>
      `

    if (!bookImg) {
      const bookImgEle = bookElement.querySelector('.book-image');
      bookImgEle.style.width = "50%"
      bookImgEle.style.height = "50%"
      bookImgEle.style.top = "50%"
      bookImgEle.style.left = "50%"
      bookImgEle.style.transform = "translate(-50%, -50%)"
      bookImgEle.style.opacity = ".1"
    }

    outerElement.appendChild(bookElement)
  }

  return {
    select,
    setText,
    toggleHidden,
    appendBookTo,
    emptyInnerHTML,

  }
})();

//Show everything when website loads//
for (const book of myLibrary.bookStorage) {
  DOMManager.appendBookTo(".book-section", book)
}

// Handle Your Books Tab
const yourBooksBtn = DOMManager.select(".your-books")

yourBooksBtn.addEventListener('click', () => {
  const bookSection = DOMManager.select(".book-section")
  
  if (bookSection.childElementCount === myLibrary.bookStorage.length + 1) {
    return;
  }//this handles all future added books counting display book

  for (const book of myLibrary.bookStorage) {
    DOMManager.appendBookTo(".book-section", book)
  }
});

// Handle Recently Read Tab
const recentlyReadBtn = DOMManager.select(".recently-read")

recentlyReadBtn.addEventListener('click', () => {
  DOMManager.emptyInnerHTML(".book-section")
  const recentlyReadBooks = myLibrary.getRecentlyRead()

  recentlyReadBooks.forEach((book) => {
    DOMManager.appendBookTo(".book-section", book)
  });
});

// Handle Form Information
const addNewBookBtn = DOMManager.select(".add-new-book")
addNewBookBtn.addEventListener('click', () => {
  DOMManager.toggleHidden(".modal")
  DOMManager.toggleHidden(".overlay")
});

const form = DOMManager.select("#form")
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const bookTitle = formData.get("bookTitle");
  const bookAuthor = formData.get("bookAuthor");
  let bookPages = formData.get("bookPages");
  let isRead = formData.get("isRead");
  let image = formData.get("bookImg");

  if (bookPages.slice(0, 1) === "0" || !bookPages || bookPages < 0) bookPages = "?";
  if (!isRead) isRead = "no";

  let book = { bookTitle, bookAuthor, bookPages, isRead }

  DOMManager.appendBookTo(".book-section", book)

  //hide modal
});