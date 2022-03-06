let test = document.getElementById("test");
let listItems = document.getElementsByClassName("list-item");
let movieModalContent = document.getElementById("movieModalContent");
let movieModalLabel = document.getElementById("movieModalLabel");
let base;
let baseUrl;
let posterSizes;
let backdropSizes;
let genres;

fetch("https://api.themoviedb.org/3/configuration?api_key=1f54bd990f1cdfb230adb312546d765d").then(function (response) {
  response.text().then(function (text) {
    base = JSON.parse(text);
    //console.log(base);
    baseUrl = base.images.secure_base_url;
    posterSizes = base.images.poster_sizes;
    backdropSizes = base.images.backdrop_sizes;
  });
});

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US").then(function (response) {
  response.text().then(function (text) {
    base = JSON.parse(text);
    console.log(base);
    genres = base.genres;
  });
});

//use a for loop to get multiple pages

fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&page=1").then(function (response) {
  response.text().then(function (text) {
    let movies = JSON.parse(text).results;
    console.log(posterSizes);
    console.log(genres);
    movies.forEach(element => {
      let movGenres = "";
      element.genre_ids.forEach(genre_id => movGenres += genres.find((genre) => genre.id === genre_id)['name']);
      test.innerHTML += "<tr data-bs-toggle='modal' data-bs-target='#movieModal' class='list-item'><td>" + element.original_title + "<input class='movie-id' type='hidden' value='" + element.id + "'></td><td><img src=" + baseUrl + posterSizes[0] + element.poster_path + "></td><td>" + movGenres + "</td><td>" + element.release_date + "</td></tr>";
    });

    console.log(text);
    console.log(listItems);

    [...listItems].forEach(listItem => {

      listItem.addEventListener('click', function () {

        let movieId = listItem.getElementsByClassName('movie-id')[0].value;

        fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US").then(function (response) {
          response.text().then(function (details) {
            let deets = JSON.parse(details);

            movieModalLabel.innerHTML = deets.original_title;
            movieModalContent.innerHTML = deets.overview;

          });
        });


      })

    });

  });
});

//Finish up modal window for movie deets or adjust it to something else depending on feedback