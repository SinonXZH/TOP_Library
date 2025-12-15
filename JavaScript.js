// 表单
const form = document.getElementById("bookInformation");

const main = document.querySelector("main");

//添加书籍让html显示
function showBookInWeb(newBook) {
  const card = document.createElement("div");
  card.className = "card";

  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.id = newBook.dateId;
  deleteBtn.textContent = "删除";
  deleteBtn.className = "delete";

  const h1 = document.createElement("h1");

  const pAuthor = document.createElement("p");

  const cardReadStatusBox = document.createElement("div");
  cardReadStatusBox.className = "cardReadStatusBox";

  const pPage = document.createElement("p");

  const innerDiv = document.createElement("div");

  const statusP = document.createElement("p");
  statusP.className = "cardReadStatus";

  const changeBtn = document.createElement("button");
  changeBtn.dataset.id = newBook.dateId;
  changeBtn.textContent = "更改";
  changeBtn.classList = "cardReadStatusChange"

  if (newBook.status == "noRead") {
    statusP.textContent = "未读";
    statusP.style.color = "red";
  }
  else {
    statusP.textContent = "已读";
    statusP.style.color = "greenyellow";
  }
    innerDiv.appendChild(statusP);

  innerDiv.appendChild(changeBtn);

  pPage.textContent = "p" + newBook.page;
  cardReadStatusBox.appendChild(pPage);
  cardReadStatusBox.appendChild(innerDiv);

  card.appendChild(deleteBtn);
  h1.textContent = newBook.name;
  card.appendChild(h1);
  pAuthor.textContent = newBook.author;
  card.appendChild(pAuthor);
  card.appendChild(cardReadStatusBox);

  main.appendChild(card);
}

class Book{
  constructor (name, author, page, status, dateId) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.status = status;
    this.dateId = dateId;
  }

  toggleStatus() {
    this.status = this.status === "noRead" ? "haveRead" : "noRead";
  }
}

class Library{
  constructor () {
    this.books = [];
  }

  addBook (newBook) {
    this.books.push(newBook);
    this.renderLibrary ();
  }

  deleteBook (bookId) {
    this.books = this.books.filter(book => book.dateId != bookId)
    this.renderLibrary ();
  }

  renderLibrary () {
    document.querySelector("main").innerHTML = "";
    this.books.forEach(book => showBookInWeb(book));
  }

  changeStatus(bookId) {
    const book = this.books.find(b => b.dateId === bookId);
    if (book) {
      book.toggleStatus();
      this.renderBooks();
      this.renderLibrary();
    }
  }
}

let myLibrary = new Library;

form.addEventListener("submit",e => {
  e.preventDefault();

  const temp = new FormData(form);

  const newBook = new Book(
    temp.get("name"),
    temp.get("author"),
    temp.get("page"),
    temp.get("readStatus"),
    crypto.randomUUID()
  )

  myLibrary.addBook(newBook);
})


main.addEventListener("click", function(e){
  if(e.target.className == "delete"){
    myLibrary.deleteBook(e.target.dataset.id);
  }

  if(e.target.className == "cardReadStatusChange"){
    myLibrary.changeStatus(e.target.dataset.id);
  }
})