var bookList = [
  {
    title: 'Lorem ipsum',
    author: 'Author 1',
    id: 1
  },
  {
    title: 'Second Book',
    author: 'Author 2',
    id: 2
  }
]

function add (book){
  book.id = bookList.length + 1;
  bookList.push(book);
}

function Book(title, author){
  this.title = title;
  this.author = author;
  this.id = bookList.length + 1;
}

function remove(myBook){
  bookList = bookList.filter(book => book.id !== myBook.id);
}

const bookAuthor = document.querySelector('.addAuthor');
const bookTitle = document.querySelector('.addTitle');

const addButton = document.querySelector(".addButton");
addButton.addEventListener('click', ()=> {
  if(bookAuthor.value != '' && bookTitle.value != ''){
    bookList.push(new Book(bookAuthor.value, bookTitle.value));
  }
  console.log(bookList);
})

// var bookSegment = document.createElement('div');
// const header = document.querySelector('.header');
// header.after(bookSegment);
// var bookSegment1 = '';

// bookList.forEach(book => {
//   bookSegment1 += `
//   <div>
//     <p> ${this.title} </p>
//     <p> ${this.author} </p>
//   </div>
//   `
// });

// bookSegment.insertAdjacentHTML('afterend',bookSegment1);