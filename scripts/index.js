const titleInput = document.querySelector('#title_input');
const authorInput = document.querySelector('#author_input');
const bookList = document.querySelector('.book_list');
const addBookButton = document.querySelector('#add_book');
const form = document.querySelector('.book_section form');

class Book {
  constructor(id, title, authorName) {
    this.id = id;
    this.title = title;
    this.authorName = authorName;
  }
}

function init() {
  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
  }
}

function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
}

function templateBook(obj) {
  const div = document.createElement('div');
  div.classList.add('book');

  const insideBook = `<p id="title">${obj.title}</p>
            <p id="author">${obj.authorName}</p>
            <button id="delete_book" type="submit" onClick="deleteBook(${obj.id})" data-id='${obj.id}'>delete</button>`;

  div.innerHTML = insideBook;

  bookList.append(div);
}

function displayBooks() {
  const books = getData('books');

  // clean the book list before.
  bookList.innerHTML = '';

  if (books) {
    books.forEach((book) => {
      templateBook(book);
    });
  }
}

function updateStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

// eslint-disable-next-line
function deleteBook(id) {
  const books = getData('books');

  if (books) {
    const updateBooks = books.filter((b) => b.id !== id);

    updateStorage(updateBooks);
    displayBooks();
  }
}

function uniqueId() {
  const { length } = getData('books');
  return length ? length + 1 : 0;
}

function addBook(e) {
  e.preventDefault();

  const id = uniqueId();
  const title = titleInput.value.trim() ? titleInput.value.trim() : 'test';
  const author = authorInput.value.trim() ? authorInput.value.trim() : 'test';

  const newBook = new Book(id, title, author);

  const books = getData('books').concat(newBook);

  updateStorage(books);

  displayBooks();

  form.reset();
}

addBookButton.addEventListener('click', addBook);

document.addEventListener('DOMContentLoaded', () => {
  init();
  displayBooks();
});
