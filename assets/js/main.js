let tableContent = document.getElementById("table-content");
let listItems = document.getElementsByClassName("list-item");
let movieModalContent = document.getElementById("movieModalContent");
let movieModalLabel = document.getElementById("movieModalLabel");
let searchBar = document.getElementById("search-bar");
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

let base, baseUrl, posterSizes, backdropSizes, genres, pages;

searchBar.addEventListener('keyup', function () {
  movieSearch();
})