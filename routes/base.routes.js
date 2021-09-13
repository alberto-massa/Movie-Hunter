
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const data = {}
    axios
    .get('https://api.themoviedb.org/3/movie/popular?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US&page=1')
    .then(thePopulars => data.popular = thePopulars.data)
    axios
    .get('https://api.themoviedb.org/3/movie/upcoming?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US&region=US')
    .then(theUpcoming => data.upcoming = theUpcoming.data)
    .then(() => res.render('index', {popular: data.popular, upcoming: data.upcoming}))
});


module.exports = router;