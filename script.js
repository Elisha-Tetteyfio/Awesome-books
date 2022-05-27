// Local Storage
function getBooks() {
  let books;
  if (localStorage.getItem('bookList') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
  return books;
}

function addBookToLS(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('bookList', JSON.stringify(books));
}

function removeBookLS(id) {
  const books = getBooks();
  books.forEach((book, index) => {
    if ((book.id).toString() === id) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('bookList', JSON.stringify(books));
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}

class BookCollection {
  static bookList = getBooks();

  static bookCard({ title, author, id }) {
    const cardHolder = document.createElement('div');
    cardHolder.classList.add('book-card');
    cardHolder.id = id; // Each book card holder assigned book id

    const displayEl = document.createElement('div');
    displayEl.textContent = `"${title}" by ${author}`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('remove-btn');

    cardHolder.append(displayEl, removeBtn);
    return cardHolder;
  }

  static addBookUI(book) {
    const bookContainer = document.querySelector('.booksContainer');
    bookContainer.appendChild(BookCollection.bookCard(book));
    // Add Book to bookList. Alternative to bookList.push(book)
    BookCollection.bookList = [...BookCollection.bookList, book];
  }

  // Display books in Booklist on page load
  static bookDisplay() {
    const bookContainer = document.querySelector('.booksContainer');
    BookCollection.bookList.forEach((book) => {
      bookContainer.appendChild(BookCollection.bookCard(book));
    });
  }

  // Remove book
  static removeBook(id) {
    BookCollection.bookList = BookCollection.bookList.filter((item) => (item.id).toString() !== id);
  }
}

// Clear form fields
function clearFormFields() {
  document.querySelector('#book-name').value = '';
  document.querySelector('#book-author').value = '';
}

// All Events
// Display books on page load
window.addEventListener('DOMContentLoaded', BookCollection.bookDisplay);

// Add Book Event
const formEl = document.querySelector('#book-form');
formEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#book-author').value;

  if (title !== '' && author !== '') {
    if (e.target.classList.contains('addButton')) {
      const newBook = new Book(title, author);
      newBook.id = BookCollection.bookList.length + 1;
      BookCollection.addBookUI(newBook);
      addBookToLS(newBook); // Add book to booklist in localStorage
      clearFormFields();
      formEl.submit();
    }
  }
});

// Remove Book from UI, localStorage and arrayList
const bookContainer = document.querySelector('.booksContainer');
bookContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const bookId = e.target.parentElement.id; // Card holder ID traversed here
    BookCollection.removeBook(bookId);
    removeBookLS(bookId);
    e.target.parentElement.remove();
  }
});

const header = document.querySelector('.header');
