class Book {
  constructor(title, author, pages, isRead, imageSrc) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this._isRead = isRead;
    this.imageSrc = imageSrc;
    this.searchKey = `${title} ${author}`.toLowerCase();
  }

  get isRead() {
    return this._isRead;
  }

  set isRead(bool) {
    this._isRead=bool;
  }
}

const book0 = new Book("The Hunger Games", "Suzzane Collins", 300, false, "assets/the-hunger-games-cover.jpg");
const book1 = new Book("Bold Beginnings", "Benny Barker", 200, true);
const book2 = new Book("Turbulent Times", "Tara Thompson", 200, false);
const book3 = new Book("Curious Chronicles", "Cathy Catherwood", 200, false);
const book4 = new Book("Amazing Adventures", "Annie Anderson", 200, true);
const book5 = new Book("Heroic Heights", "Harry Henderson", 200, false);
const book6 = new Book("Silent Secrets", "Sally Sanders", 200, false);
const book7 = new Book("Daring Decisions", "Damian Davis", 200, true);
const book8 = new Book("Shifting Shadows", "Shawn Sherwood", 200, true);

let books = [ book0, book1, book2, book3, book4, book5, book6, book7, book8, ]

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
      book.title = book.title.toLowerCase().trim()  
      book.author = book.author.toLowerCase().trim()
    
      this._bookStorage.push(book)
    })
  }

  removeFromStorage(index) {//int
    if (!index) return;
    return this._bookStorage.splice(index, 1)
  }

  removeAllStorage() {
    this._bookStorage = [];
  }

  getBookTitleAuthor(book) {//obj
    return book.title + book.author;
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

  function addHiddenState(selector) {
    const elementClasslist = select(selector).classList;
    if (!elementClasslist.contains("hidden")) elementClasslist.add("hidden");
  }

  function removeHiddenState(selector) {
    const elementClasslist = select(selector).classList;
    if (elementClasslist.contains("hidden")) elementClasslist.remove("hidden");
  }

  function appendBookTo(selector, book) {//str, obj
    const outerElement = select(selector);

    if (!outerElement || !book) return;

    const bookTitle = book.title
    const bookAuthor = book.author
    const bookPages = book.pages
    const bookIsRead = book.isRead
    let bookImgSrc = book.imageSrc

    if (!bookImgSrc) bookImgSrc = "assets/icons/recentlyRead.svg";

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
            <div class="read-now-btn">
              <p class="book-read-now book-action-text">Read Now</p>
            </div>

            ${bookIsRead ?
            `<div class="contain-book-already-read">
              <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
              <p class="already-read book-action-text">Already Read</p>
            </div>

            <div class="contain-book-mark-read hidden">
              <p class="mark-read book-action-text">Mark as Read</p>
            </div>`
            :
            `<div class="contain-book-already-read hidden">
              <img src="assets/icons/check.svg" alt="Already Read" class="icon book-action-icon">
              <p class="already-read book-action-text">Already Read</p>
            </div>
            
            <div class="contain-book-mark-read">
              <p class="mark-read book-action-text">Mark as Read</p>
            </div>`
            }

            <div class="delete-btn">
              <p class="book-delete book-action-text">Delete</p>
            </div>
          </div>
        </div>
      `

    if (bookImgSrc==="assets/icons/recentlyRead.svg") {
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
    addHiddenState,
    removeHiddenState,

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
  DOMManager.addHiddenState(".search-result-not-found")
  DOMManager.emptyInnerHTML(".book-section")
  
  if (bookSection.childElementCount >= myLibrary.bookStorage.length) {
    return;
  }//this handles all future added books counting display book

  for (const book of myLibrary.bookStorage) {
    DOMManager.appendBookTo(".book-section", book)
  }
});

// Handle Recently Read Tab
const recentlyReadBtn = DOMManager.select(".recently-read")

recentlyReadBtn.addEventListener('click', () => {
  DOMManager.addHiddenState(".search-result-not-found");
  DOMManager.emptyInnerHTML(".book-section")
  const recentlyReadBooks = myLibrary.getRecentlyRead()

  recentlyReadBooks.forEach((book) => {
    DOMManager.appendBookTo(".book-section", book)
  });
});

// Handle Form Information + Modal Actions
const modal = DOMManager.select(".modal");
const modalCancelBtn = modal.querySelector(".cancel-btn")

function resetModalInputs() {
  const modalInputs = document.querySelector('.modal')
    .querySelectorAll("input");

  for (const inputField of modalInputs) {
    if (inputField.type==="text" || 
      inputField.type==="number") inputField.value = "";

    if (inputField.type === "radio") 
      inputField.checked = false;
  }
}

const addNewBookBtn = DOMManager.select(".add-new-book")
addNewBookBtn.addEventListener('click', () => {
  DOMManager.addHiddenState(".search-result-not-found");
  DOMManager.toggleHidden(".modal")
  DOMManager.toggleHidden(".overlay")
});

//Modal Actions
modalCancelBtn.addEventListener('click', () => {
  DOMManager.toggleHidden(".modal")
  DOMManager.toggleHidden(".overlay")
});

const form = DOMManager.select("#form")
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("bookTitle");
  const author = formData.get("bookAuthor");
  let pages = formData.get("bookPages");
  let _isRead = formData.get("isRead");
  let image = formData.get("bookImg");

  if (pages.slice(0, 1) === "0" || !pages || pages < 0) pages = "?";
    pages = Number(pages)
  if (!_isRead) _isRead = false;
  if (_isRead==="false") _isRead = false;
  if (_isRead==="true") _isRead = true;

  let book = { title, author, pages , _isRead }

  myLibrary.addToStorage(book)
  DOMManager.appendBookTo(".book-section", book);

  resetModalInputs()
  DOMManager.toggleHidden(".modal")
  DOMManager.toggleHidden(".overlay")
});

//Handle clicking Recently/Already Read Tab/Delete Button on Book
const bookSection = DOMManager.select(".book-section");
let storage; //temp storage

bookSection.addEventListener('click', (e) => {
  const bookEle = e.target.closest(".book");
    if (!bookEle) return;
  storage = bookEle;

  const bookIndex = bookEle.dataset.indexNumber;//account for dummy book
  const markReadTab = bookEle.querySelector(".contain-book-mark-read")
  const alreadyReadTab = bookEle.querySelector(".contain-book-already-read");

  const clickedEle = e.target;
  const clickedEleClassList = clickedEle.classList.value;
    if (clickedEleClassList.includes("mark-read")) {
      myLibrary.getFromStorage(bookIndex).isRead = true;
      markReadTab.classList.toggle("hidden")
      alreadyReadTab.classList.toggle("hidden")
      return;
    }
    
    if (clickedEleClassList.includes("already-read")) {
      myLibrary.getFromStorage(bookIndex).isRead = false;
      markReadTab.classList.toggle("hidden")
      alreadyReadTab.classList.toggle("hidden")
      return;
    }

    if (
      clickedEleClassList.includes("delete-btn") ||
      clickedEleClassList.includes("book-delete")
      ) 
    {
      DOMManager.toggleHidden(".modal-confirm-delete")
      DOMManager.toggleHidden(".confirm-modal-overlay")
      return;
    }
});

//Handle Delete Book Modal + Overlay Actions
const delCancelBtn = DOMManager.select(".confirm-cancel-btn");
const delYesBtn = DOMManager.select(".confirm-yes-btn")
const delOverlay = DOMManager.select(".confirm-modal-overlay");

delCancelBtn.addEventListener('click', () => {
  DOMManager.toggleHidden(".modal-confirm-delete")
  DOMManager.toggleHidden(".confirm-modal-overlay")
});
delOverlay.addEventListener('click', () => {
  DOMManager.toggleHidden(".modal-confirm-delete")
  DOMManager.toggleHidden(".confirm-modal-overlay")
});
delYesBtn.addEventListener('click', () => {
  let index = storage.dataset.indexNumber;

  myLibrary.removeFromStorage(index)
  storage.remove();

  DOMManager.toggleHidden(".modal-confirm-delete")
  DOMManager.toggleHidden(".confirm-modal-overlay")
});

//Handle Search Bar
const searchBar = DOMManager.select("#search-bar")
searchBar.addEventListener('keydown', function (e) {
  const pressedKey = e.key;
  if (pressedKey==="Enter") {
    e.preventDefault()

    let searchTerms = new Set(
      searchBar.value
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 1)
    );
    if (searchTerms) 
      DOMManager.addHiddenState(".search-result-not-found");

    DOMManager.emptyInnerHTML(".book-section");

    for (const book of myLibrary.bookStorage) {
      for (const term of searchTerms) {
        if (book.searchKey.includes(term)) {
          DOMManager.appendBookTo(".book-section", book);
          return;
        }
      }
    }
    //Checks
    if (searchTerms.size < 2) {
      DOMManager.emptyInnerHTML(".book-section");
      DOMManager.removeHiddenState(".search-result-not-found");
      return;
    };

    DOMManager.removeHiddenState(".search-result-not-found");
  };
});