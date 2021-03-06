// MOVIES SEARCH

const printInfo = info => {

  if (info) {
    let text = ""

    info.forEach(elm => text += `
    <div class="col-md-4 mt-5">
    <a href="/movies/${elm.id}">
    <img src=https://image.tmdb.org/t/p/original${elm.poster_path}></a>
    </div><div class="col-md-6 mt-5"><h2>Original Title</h2>
    ${elm.title}<h3>Overview</h3>${elm.overview}<h3>Release date</h3>${elm.release_date}</div><hr>`)

    document.querySelector('#result').innerHTML = text
  }
}


document.querySelector('#movie').onkeyup = () => {
  let movie = document.querySelector('#movie').value 
  console.log(movie)

  if (movie.length >= 1) {

  axios
  .get(`https://api.themoviedb.org/3/search/movie?api_key=7d29ed24134deee78178561cf7b0a16c&query=${movie}`)
  .then(response => printInfo(response.data.results))
  }
}