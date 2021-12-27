
//simple object constructor 
function Book(title,author,pages,read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; //expects boolean

  this.toggleRead = function(){
    this.read = !this.read;
  }
}

//set up array to store all books
let myLibrary = [];

//addition of local storage:
if(!localStorage.getItem('odinLibrary')) {
  populateDefaultLibrary();
  populateStorage();
} else {
  loadStoredLibrary();
}

//simple default library used if no local storage
function populateDefaultLibrary() {
  const theHobbit = new Book("The Hobbit","J.R.R. Tolkien", 295, true);
  const lotr = new Book("The Fellowship of the Ring","J.R.R. Tolkien", 500, true);
  myLibrary = [theHobbit, lotr];
}

//updates local storage with myLibrary array
function populateStorage() {
  localStorage.setItem('odinLibrary', JSON.stringify(myLibrary));

  loadStoredLibrary();
}

function loadStoredLibrary() {
  myLibrary = [];
  myTempLibrary = JSON.parse(localStorage.getItem('odinLibrary'));
  myTempLibrary.forEach(function(book){
    newBook = new Book(book.title,book.author,book.pages,book.read);
    myLibrary.push(newBook);
  });
}



const libraryList = document.getElementById('library')

populateLibrary();



function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  let book = new Book(title,author,pages,read);

  myLibrary.push(book);
  populateLibrary();
}



//done using "old method"
/*
myLibrary.forEach(function(book){
  const ul = document.createElement('ul');
  const title = document.createElement('li');
  title.innerHTML = "Title: " + book.title;
  const author = document.createElement('li');
  author.innerHTML = "Author: " + book.author;
  const pages = document.createElement('li');
  pages.innerHTML = "Number of pages: " + book.pages;
  const read = document.createElement('li');
  read.innerHTML = book.read;
  ul.appendChild(title);
  ul.appendChild(author);
  ul.appendChild(pages);
  ul.appendChild(read);
  libraryList.appendChild(ul);
})

//"inbetween" method (doesnt work)
myLibrary.forEach(function(book){
  let html = document.createElement('div');
  htmlstr = "<ul><li>Title: " + book.title + "</li><li>Author: " + book.author + "</li><li>Number of pages: " + book.pages + "</li><li>Read: " + book.read + "</li></ul>";
  html.innerHTML = htmlstr;
  libraryList.appendChild(html);
})

*/

// done using template literal (so easy!)
// changed to a function so it can be refreshed

function populateLibrary() {
  populateStorage();
  libraryList.innerHTML = `<h1>Library</h1>`;
  let index = 0
  myLibrary.forEach(function(book){
    let html = document.createElement('div')
    html.innerHTML = `<ul>
      <li>Title: ${book.title}</li>
      <li>Author: ${book.author}</li>
      <li>Number of pages: ${book.pages}</li>
      <li>Read: ${book.read}</li>
      <li><button arrIndex=${index} class="bookReadBtn" type="button">Mark as read</button></li>
      <li><button arrIndex=${index} class="bookDeleteBtn" type="button">Delete!</button></li></ul>`;
    index++;
    libraryList.appendChild(html);
  })
  addListenersToLibrary();
}



let showFormBtn = document.getElementById("showFormButton");
let form = document.getElementById("form");
form.style.display = "none";
showFormBtn.addEventListener("click", toggleForm);
function toggleForm(){
  if (form.style.display === "none") {
    form.style.display = "block";
    showFormBtn.innerHTML = "Hide form!";
  } else {
    form.style.display = "none";
    showFormBtn.innerHTML = "Show form!";
  }

}

let addBookBtn = document.getElementById("submitForm");
addBookBtn.addEventListener("click", addBookToLibrary);

function addListenersToLibrary() {
  let toggleReadBtns = document.querySelectorAll(".bookReadBtn");
  toggleReadBtns.forEach(function(element){
    element.addEventListener("click", readToogler);
  })
  let toggleDeleteBtns = document.querySelectorAll(".bookDeleteBtn");
  toggleDeleteBtns.forEach(function(element){
    element.addEventListener("click", deleteBook);
  })
}


function readToogler() {
  let bookId = this.getAttribute("arrIndex");
  myLibrary[bookId].toggleRead();
  populateLibrary();
}



function deleteBook() {
  let bookId = this.getAttribute("arrIndex");
  myLibrary.splice(bookId,1);
  populateLibrary();
}

