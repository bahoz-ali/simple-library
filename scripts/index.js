/* eslint-disable max-classes-per-file */
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

class Library {
  books = [];

  uniqueId = () => {
    const { length } = this.books;
    return length ? length + 1 : 0;
  };

  addBook = (e) => {
    e.preventDefault();

    const id = this.uniqueId();
    const title = titleInput.value.trim() ? titleInput.value.trim() : 'test';
    const author = authorInput.value.trim() ? authorInput.value.trim() : 'test';

    const newBook = new Book(id, title, author);

    this.books.push(newBook);

    this.updateStorage();

    this.displayBooks();

    form.reset();
  };

  // eslint-disable-next-line
  deleteBook = (id) => {
    if (this.books) {
      this.books = this.books.filter((b) => b.id !== id);

      this.updateStorage();
      this.displayBooks();
    }
  };

  getBooks = () => {
    try {
      return JSON.parse(localStorage.getItem('books'));
    } catch (error) {
      return localStorage.getItem('books');
    }
  };

  createLocalStorage() {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      this.books = this.getBooks();
    }
  }

  updateStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  templateBook = (obj) => {
    const div = document.createElement('div');
    div.classList.add('book');

    const insideBook = `
     <p><span>${obj.title}</span> by <span>${obj.authorName}</span></p>
             <button class="btn" id="delete_book" type="submit" onClick="library.deleteBook(${obj.id})" data-id='${obj.id}'>delete</button>`;

    div.innerHTML = insideBook;

    bookList.append(div);
  };

  displayBooks() {
    // clean the book list before.
    bookList.innerHTML = '';

    if (this.books || this.books.length !== 0) {
      this.books.forEach((book) => {
        this.templateBook(book);
      });
    }
  }
}

function show () {

}

function hi () {
  
}

const library = new Library();

document.addEventListener('DOMContentLoaded', () => {
  library.createLocalStorage();
  library.displayBooks();
  addBookButton.addEventListener('click', library.addBook);
});