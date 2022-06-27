const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookList = document.querySelector('.book_list');

let id = 0;

class Book {
  constructor(id, title, authorName) {
    this.id = id;
    this.title = title;
    this.authorName = authorName;
  }
}

const book = new Book(1, 'sad book', 'Chim');

function init() {
  if (localStorage.getItem('books')) {
    return null;
  }

  localStorage.setItem('books', JSON.stringify([]));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function templateBook(obj) {
  const div = document.createElement('div');
  div.classList.add('book');

  const insideBook = `<p id="title">${obj.title}</p>
            <p id="author">${obj.authorName}</p>
            <button type="submit">delete</button>`;

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

document.addEventListener('DOMContentLoaded', () => {
  init();
  displayBooks();
});
