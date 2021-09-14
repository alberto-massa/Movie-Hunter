const express = require('express');
const CharactersApiHandler = require('../public/js/api-handler');
const router = express.Router();

const apiHandler = new CharactersApiHandler

router.get('/', (req, res) => {
    
    const popularMovies = apiHandler.getPopulars()
    const upcomingMovies = apiHandler.getUpcoming()

    const movies = [popularMovies, upcomingMovies]

    Promise
        .all(movies)
        .then(response => {
            const movieData = {
                popularData: response[0].data,
                upcomingData: response[1].data
            }
            res.render('index', {movieData})
        })
        .catch(err => console.log(err))
});

module.exports = router;