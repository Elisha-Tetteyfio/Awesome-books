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

let bookList = getBooks();

// Book Constructor function
function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = bookList.length + 1;
}

// Book Card Template
function bookCard({ title, author, id }) {
  const cardHolder = document.createElement('div');
  cardHolder.classList.add('book-card');
  cardHolder.id = id; // Each book card holder assigned book id

  const titleEl = document.createElement('div');
  titleEl.textContent = title;

  const authorEl = document.createElement('div');
  authorEl.textContent = author;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'remove';
  removeBtn.classList.add('remove-btn');

  const hr = document.createElement('hr');

  cardHolder.append(titleEl, authorEl, removeBtn, hr);
  return cardHolder;
}

// Display books in Booklist on page load
function bookDisplay() {
  const bookContainer = document.querySelector('.booksContainer');
  bookList.forEach((book) => bookContainer.appendChild(bookCard(book)));
}

// Add Book to Array & UI
function addBookUI(book) {
  const bookContainer = document.querySelector('.booksContainer');
  bookContainer.appendChild(bookCard(book));
  bookList = [...bookList, book]; // Add Book to bookList. Alternative to bookList.push(book)
}

// Clear form fields
function clearFormFields() {
  document.querySelector('#book-name').value = '';
  document.querySelector('#book-author').value = '';
}

// Remove book
function removeBook(id) {
  bookList = bookList.filter((item) => (item.id).toString() !== id);
}

// All Events
// Display books on page load
window.addEventListener('DOMContentLoaded', bookDisplay);

// Add Book Event
const formEl = document.querySelector('#book-form');
formEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#book-author').value;

  if (title !== '' && author !== '') {
    if (e.target.classList.contains('addButton')) {
      const newBook = new Book(title, author);
      addBookUI(newBook);
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
    removeBook(bookId);
    removeBookLS(bookId);
    e.target.parentElement.remove();
  }
});
