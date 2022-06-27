const bookTitle = document.querySelector('#Title');
const bookAuthor = document.querySelector('#Author');
const date = document.querySelector('');
const booksStore = [];

// instatiate
const Book1 = new BookCollection(bookTitle, bookAuthor, booksStore);
Book1.saveData();
Book1.removeData();
Book1.existingData();

// pageSwitcher();
// date.textContent = currentDate();