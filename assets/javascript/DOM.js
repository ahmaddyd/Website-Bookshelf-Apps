const ID_BOOK_UNCOMPLETED = "belumSelesaiDibaca";
const ID_BOOK_COMPLETED = "sudahSelesaiDibaca";
const ID_BOOKS = "ID_Buku";

const cariBuku = () => 
{
    const inputSearchBooks = document.getElementById("mencariJudulBuku");
    const cariBuku = inputSearchBooks.value.toLowerCase();
    const books = document.querySelectorAll(".item_books");
    Array.from(books).forEach((book) => 
    {
        const textjudulBuku = book.firstElementChild.textContent;

        if (textjudulBuku.toLowerCase().indexOf(cariBuku) != -1) 
        {
            book.style.display = "block";
        } 

        else 
        {
            book.style.display = "none";
        }
    });
}

function createBooks(judulBuku, penulisBuku, tahunBuku, isComplete) 
{
  const textjudulBuku = document.createElement("h2");
  textjudulBuku.innerHTML = "Judul Buku : " + judulBuku;
  const textpenulisBuku = document.createElement("p");
  textpenulisBuku.innerHTML = "Penulis : " + penulisBuku;
  const texttahunBuku = document.createElement("p");
  texttahunBuku.innerHTML = "Tahun : " + tahunBuku;
  const textContainer = document.createElement("article");
  textContainer.classList.add("item_books");
  textContainer.append(textjudulBuku, textpenulisBuku, texttahunBuku);

  if (isComplete) 
  {
    textContainer.append(createUndoButton(), createTrashButton());
  } 
  else 
  {
    textContainer.append(createCheckButton(), createTrashButton());
  }
  return textContainer;
}

function tambahBuku() {
  const completeBookList = document.getElementById(ID_BOOK_COMPLETED);
  const uncompleteBookList = document.getElementById(ID_BOOK_UNCOMPLETED);
  const var_judul_buku = document.getElementById("judulBuku").value;
  const var_penulis_buku = document.getElementById("penulisBuku").value;
  const var_tahun_buku = document.getElementById("tahunBuku").value;
  const checkBox = document.getElementById("checkBookIsComplete");

  if (checkBox.checked == true) 
  {
    const book = createBooks
    (var_judul_buku, var_penulis_buku, var_tahun_buku, 
    true);

    const objek_buku = composeBookObject
    (var_judul_buku, var_penulis_buku, var_tahun_buku, 
    true);

    book[ID_BOOKS] = objek_buku.id;
    books.push(objek_buku);

    completeBookList.append(book);
    updateDataToStorage();
  } 
    else 
      {
        const book = createBooks(
          var_judul_buku, 
          var_penulis_buku, 
          var_tahun_buku, 
          false
          );

        const objek_buku = composeBookObject(var_judul_buku, var_penulis_buku, var_tahun_buku, false);

        book[ID_BOOKS] = objek_buku.id;
        books.push(objek_buku);
        uncompleteBookList.append(book);
        updateDataToStorage();
  }
}

function createButton(buttonTypeClass, text, eventListener) 
{
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = text;
  button.addEventListener('click', function(event) {
    eventListener(event);
  });

  return button;
}

function addBookToCompleted(bookElement) {
  const listCompleted = document.getElementById(ID_BOOK_COMPLETED);
  const EL_Title_Book = bookElement.querySelector(".item_books > h2").innerText;
  const EL_Author_Book = bookElement.querySelector(".item_books > p").innerText;
  const EL_Year_Book = bookElement.querySelector(".item_books > p").innerText;

  const buku_baru = createBooks(
    EL_Title_Book, 
    EL_Author_Book, 
    EL_Year_Book, true
    );

  const buku = mencariBuku(bookElement[ID_BOOKS]);
  buku.isComplete = true;

  buku_baru[ID_BOOKS] = buku.id;
  listCompleted.append(buku_baru);

  bookElement.remove();
  updateDataToStorage();
  window.location.reload();
}

function undoBookToStillRead(bookElement) {
  const listUncompleted = document.getElementById(ID_BOOK_UNCOMPLETED);

  const EL_Title_Book = bookElement.querySelector(".item_books > h2").innerText;
  const EL_Author_Book = bookElement.querySelector(".item_books > p").innerText;
  const EL_Year_Book = bookElement.querySelector(".item_books > p").innerText;

  const buku_baru = createBooks
  (
    EL_Title_Book, 
    EL_Author_Book, 
    EL_Year_Book, 
    false
  );

  const buku = mencariBuku(bookElement[ID_BOOKS]);
  buku.isComplete = false;

  buku_baru[ID_BOOKS] = buku.id;
  listUncompleted.append(buku_baru);

  bookElement.remove();
  updateDataToStorage();
  window.location.reload();
}

function removeBookFromCompleted(bookElement) 
{
    const posisi_buku = mencariIndeksBuku(bookElement[ID_BOOKS]);
    books.splice(posisi_buku, 1);
    bookElement.remove();
    updateDataToStorage();
}

function createButtonContainer() 
{
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  return buttonContainer;
}

function createCheckButton() 
{
  return createButton("btn_read", "Selesai Dibaca", function (event) 
  {
    addBookToCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("btn_deleted", "Hapus Buku", function (event) 
  {
    removeBookFromCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("btn_read", "Belum Selesai Dibaca", function (event) 
  {
    undoBookToStillRead(event.target.parentElement);
  });
}