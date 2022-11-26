document.addEventListener("DOMContentLoaded", function () 
{
  const submitSearchBooks = document.getElementById("cariBuku");
  const submitBooksForm = document.getElementById("inputBookshelf");
  submitBooksForm.addEventListener("submit", function (event) 
  {
    event.preventDefault();
    tambahBuku();
    window.location.reload();
    alert("Books Successfully Input");
  });
  submitSearchBooks.addEventListener("submit", function (event)
  {
    event.preventDefault();
    cariBuku();
  });

  if (cekPenyimpanan()) 
  {
    loadDataFromStorage();
  }
});
document.addEventListener("ondatasaved", () => 
{
  console.log("Data Saved Successfully.");
});
document.addEventListener("ondataloaded", () => 
{
  refreshDataFromBookshelf();
});