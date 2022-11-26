const localStorageKey = "bookshelf-apps";

let books = [];

function cekPenyimpanan() 
{
  if (typeof Storage === undefined) 
  {
    alert("Browser Anda tidak mendukung local storage");
    return false;
  }

  return true;
}

function simpanData() 
{
  const parsed = JSON.stringify(books);
  localStorage.setItem(localStorageKey, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() 
{
  const serializedData = localStorage.getItem(localStorageKey);
  const data = JSON.parse(serializedData);
  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() 
{
  if (cekPenyimpanan()) simpanData();
}

function composeBookObject(judulBuku, penulisBuku, tahunBuku, isComplete) 
{
  return {id: +new Date(), judulBuku, penulisBuku, tahunBuku, isComplete,};
}

function mencariBuku(ID_Buku) 
{
  for (book of books) 
  {
    if (book.id === ID_Buku) return book;
  }

  return null;
}

function mencariIndeksBuku(ID_Buku) 
{
  let index = 0;
  for (book of books) 
  {
    if (book.id === ID_Buku) return index;

    index++;
  }
  return -1;
}

function refreshDataFromBookshelf() 
{
  const listUncompleted = document.getElementById(ID_BOOK_UNCOMPLETED);
  const listCompleted = document.getElementById(ID_BOOK_COMPLETED);
  for (book of books) 
  {
    const newBook = createBooks
    (
      book.judulBuku,
      book.penulisBuku,
      book.tahunBuku,
      book.isComplete
    );
    newBook[ID_BOOKS] = book.id;

    if (book.isComplete) 
    {
      listCompleted.append(newBook);
    } 
    else 
    {
      listUncompleted.append(newBook);
    }
  }
}