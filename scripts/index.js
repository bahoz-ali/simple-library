const titleInput = document.querySelector('#title_input');
const authorInput = document.querySelector('#author_input');
const bookList = document.querySelector('.book_list');
const addBookButton = document.querySelector('#add_book');

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

  // clean the display books then before.
  bookList.innerHTML = '';

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

// eslint-disable-next-line
function deleteBook(id) {
  const books = getData('books');

  if (books) {
    const updateBooks = books.filter((b) => b.id !== id);

    localStorage.setItem('books', JSON.stringify(updateBooks));
    displayBooks();
  }
}

function addBook(e) {
  e.preventDefault();

  const form = document.querySelector('.book_section form');

  const { length } = getData('books');
  const id = length ? length + 1 : 0;
  const title = titleInput.value.trim() ? titleInput.value.trim() : 'test';
  const author = authorInput.value.trim() ? authorInput.value.trim() : 'test';

  const newBook = new Book(id, title, author);

  updateStorage(newBook);
  form.reset();
}

addBookButton.addEventListener('click', addBook);
// deleteBookButton.addEventListener('click', deleteBook);

document.addEventListener('DOMContentLoaded', () => {
  init();
  displayBooks();
});
