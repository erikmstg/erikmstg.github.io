const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const imgPath = "https://image.tmdb.org/t/p/w1280";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const form = document.getElementById("form");
const searching = document.getElementById("search");
const main = document.getElementById("main");

// initial get movies
getMovie(apiUrl);

async function getMovie(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  //   respData.results.forEach((movie) => {
  //     const img = document.createElement("img");
  //     img.src = imgPath + movie.poster_path;

  //     document.body.appendChild(img);
  //   });

  showMovies(respData.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieList = document.createElement("div");
    movieList.classList.add("movie");

    movieList.innerHTML = `
        <img 
          src="${imgPath + poster_path}" 
          alt="${title}"
        />
        <div class="movie-info"> 
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview:</h3>
          ${overview}
        </div>
      `;

    main.appendChild(movieList);
  });
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searching.value;

  if (searchTerm) {
    getMovie(searchApi + searchTerm);

    searching.value = "";
  }
  console.log(searchTerm);
});
