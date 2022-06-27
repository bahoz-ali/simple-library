const titleInput = document.querySelector('#title_input');
const authorInput = document.querySelector('#author_input');
const bookList = document.querySelector('.book_list');
const addBookButton = document.querySelector('#add_book');

let id = 0;
function updateId() {
  id++;
}

class Book {
  constructor(id, title, authorName) {
    this.id = id;
    this.title = title;
    this.authorName = authorName;
  }
}

function init() {
  if (localStorage.getItem('books')) {
    return null;
  }

  localStorage.setItem('books', JSON.stringify([]));
}

function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key)
  }
}

function templateBook(obj) {
  const div = document.createElement('div');
  div.classList.add('book');

  const insideBook = `<p id="title">${obj.title}</p>
            <p id="author">${obj.authorName}</p>
            <button type="submit" data-id='${obj.id}'>delete</button>`;

  div.innerHTML = insideBook;

  bookList.append(div);
}

function displayBooks() {
  const books = getData('books');

  if (books) {
    books.forEach((book) => {
      templateBook(book);
    });
  }
}

function updateStorage(book) {
  const books = getData('books');
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function addBook(e) {
  e.preventDefault();
  let title = titleInput.value.trim() ? titleInput.value.trim() : 'test';
  let author = authorInput.value.trim() ? authorInput.value.trim() : 'test';

  const newBook = new Book(id, title, author);

  updateStorage(newBook);

  updateId();
}

addBookButton.addEventListener('click', addBook);

document.addEventListener('DOMContentLoaded', () => {
  init();
  displayBooks();
});
