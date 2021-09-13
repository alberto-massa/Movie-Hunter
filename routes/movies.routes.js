const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => res.render('movies/search'))

router.get('/:movieId', (req, res) => {

    const {movieId} = req.params
    console.log(movieId);

    axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US`)
    .then(response => res.render('movies/details', response.data))
}
)

module.exports = router;
