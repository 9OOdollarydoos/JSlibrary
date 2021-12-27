
//simple object constructor refactored into class
class Book {

  constructor(title,author,pages,read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; //expects boolean
  }

  updateRead() {
    this.read = !this.read;
  }

  getTitle() { return this.title; }

  getAuthor() { return this.author; }

  getPages() { return this.pages; }

  getRead() { return this.read; }
  
}

//refactored all library and storage methods into a module
const library = (() => {
  let myLibrary = [];
  
  const addBook = (title,author,pages,read) => {
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
    update();
  }

  const removeBook = (index) => {
    myLibrary.splice(index,1);
  }

  const getLibrary = () => myLibrary;
  
  const defaultLibrary = () => { 
    //simple default library to use if no local storage
    const theHobbit = new Book("The Hobbit","J.R.R. Tolkien", 295, true);
    const lotr = new Book("The Fellowship of the Ring","J.R.R. Tolkien", 500, true);
    myLibrary = [theHobbit, lotr];
  }

  const update = () => {
    //updates local storage with myLibrary array
    localStorage.setItem('odinLibrary', JSON.stringify(myLibrary));
  }

  const load = () => {
    //load library from local storage otherwise uses default library
    myTempLibrary = JSON.parse(localStorage.getItem('odinLibrary'));
    if (myTempLibrary && myTempLibrary.length > 0) {
      myTempLibrary.forEach(function(book){
        newBook = new Book(book.title,book.author,book.pages,book.read);
        myLibrary.push(newBook);
      });
    } else { defaultLibrary() }
  }

  load();

  return {addBook, getLibrary, update, removeBook}
})()

const displayController = (() => {
  const libraryList = document.getElementById('library')
  let showFormBtn = document.getElementById("showFormButton");
  let form = document.getElementById("form");
  form.style.display = "none";
  let addBookBtn = document.getElementById("submitForm");
  addBookBtn.addEventListener("click", addBook);
    
  const toggleForm = () => {
    if (form.style.display === "none") {
      form.style.display = "block";
      showFormBtn.innerHTML = "Hide form!";
    } else {
      form.style.display = "none";
      showFormBtn.innerHTML = "Show form!";
    }
  }

  showFormBtn.addEventListener("click", toggleForm);

  const addBookEventListeners = () => {
    let toggleReadBtns = document.querySelectorAll(".bookReadBtn");
    toggleReadBtns.forEach(function(element){
      element.addEventListener("click", readToogler);
    })
    let toggleDeleteBtns = document.querySelectorAll(".bookDeleteBtn");
    toggleDeleteBtns.forEach(function(element){
      element.addEventListener("click", deleteBook);
    })
  }

  const refreshLibrary = () => {
    libraryList.innerHTML = `<h1>Library</h1>`;
    let index = 0;
    library.getLibrary().forEach(function(book){
      let html = document.createElement('div')
      html.innerHTML = `<ul>
        <li>Title: ${book.getTitle()}</li>
        <li>Author: ${book.getAuthor()}</li>
        <li>Number of pages: ${book.getPages()}</li>
        <li>Read: ${book.getRead()}</li>
        <li><button arrIndex=${index} class="bookReadBtn" type="button">Mark as read</button></li>
        <li><button arrIndex=${index} class="bookDeleteBtn" type="button">Delete!</button></li></ul>`;
      index++;
      libraryList.appendChild(html);
    })
    addBookEventListeners();
  }

  function readToogler() {
    let bookId = event.target.getAttribute("arrIndex");
    library.getLibrary()[bookId].updateRead();
    refreshLibrary();
    library.update();
  }

  function deleteBook() {
    let bookId = event.target.getAttribute("arrIndex");
    library.removeBook(bookId);
    refreshLibrary();
    library.update();
  }

  function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    library.addBook(title,author,pages,read);
    refreshLibrary();
  }

  refreshLibrary();

})()