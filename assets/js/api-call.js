fetch("https://api.themoviedb.org/3/configuration?api_key=1f54bd990f1cdfb230adb312546d765d").then(function (response) {
  response.text().then(function (text) {
    base = JSON.parse(text);
    baseUrl = base.images.secure_base_url;
    posterSizes = base.images.poster_sizes;
    backdropSizes = base.images.backdrop_sizes;
  });
});

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US").then(function (response) {
  response.text().then(function (text) {
    base = JSON.parse(text);
    genres = base.genres;
  });
});

//use a for loop to get multiple pages
for (let i = 1; i < 5; i++) {

  fetch("https://api.themoviedb.org/3/discover/movie?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=" + i + "&primary_release_date.gte=" + today).then(function (response) {
    response.text().then(function (text) {

      let movies = JSON.parse(text).results;
      
      movies.forEach(element => {

        let movGenres = "";
        let imgSrc = null;
        (element.poster_path == null) ? imgSrc = baseUrl + backdropSizes[0] + element.backdrop_path: imgSrc = baseUrl + posterSizes[0] + element.poster_path;
        element.genre_ids.forEach(genre_id => movGenres += genres.find((genre) => genre.id === genre_id)['name'] + ", ");
        movGenres = movGenres.slice(0, -2);
        
        if (movGenres.length == 0){movGenres = "<b>GENRE UNAVAILABLE";}

        let imgElmt;

        (/null/.test(imgSrc)) ? imgElmt = "<b>IMAGE UNAVAILABLE</b>": imgElmt = `<img class='movie-poster' src=` + imgSrc + `>`;


        tableContent.innerHTML += `<tr data-bs-toggle='modal' data-bs-target='#movieModal' class='list-item'>
                            <td>` + element.title + `<input class='movie-title' type='hidden' value='` + element.title + `'></td>
                            <td>` + imgElmt + `
                               <input class='movie-overview' type='hidden' value='` + element.overview + `'>
                            </td>
                            <td>` + movGenres + `<input class='movie-genre' type='hidden' value='` + movGenres + `'></td>
                            <td>` + element.release_date + `<input class='movie-release-date' type='hidden' value='` + element.release_date + `'></td>
                        </tr>`;
      });

      [...listItems].forEach(listItem => {

        listItem.addEventListener('click', function () {

          let movieTitle = listItem.getElementsByClassName('movie-title')[0].value;
          let moviePoster = listItem.getElementsByClassName('movie-poster')[0];
          let movieOverview = listItem.getElementsByClassName('movie-overview')[0].value;
          let movieGenres = listItem.getElementsByClassName('movie-genre')[0].value;
          let movieReleaseDate = listItem.getElementsByClassName('movie-release-date')[0].value;

          movieModalContent.innerHTML = "";
          movieModalLabel.innerHTML = movieTitle;
          movieModalContent.innerHTML += `<div id="movie-details">
                                                 <div>` + movieOverview + `</div>
                                                 <div><h6>Genre</h6>` + movieGenres + `</div>
                                                 <div><h6>Release Date</h6>` + movieReleaseDate + `</div>
                                            </div> `;

          if (moviePoster != null) {
            document.getElementById('movie-details').prepend(moviePoster.cloneNode(true));
          } else {
            let b = document.createElement("b")
            b.innerHTML = 'IMAGE UNAVAILABLE';
            document.getElementById('movie-details').prepend(b);
          }

        })

      });

    });
  });

}