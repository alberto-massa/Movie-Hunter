const express = require('express');
const CharactersApiHandler = require('../public/js/api-handler');
const router = express.Router();

const apiHandler = new CharactersApiHandler

router.get('/', (req, res) => {
    
    const popularMovies = apiHandler.getPopulars()
    const upcomingMovies = apiHandler.getUpcoming()
    const trendingMovies = apiHandler.getTrending()

    const movies = [popularMovies, upcomingMovies, trendingMovies]

    Promise
        .all(movies)
        .then(response => {
            let randomNum = Math.floor((Math.random() * 20) + 1)

            const movieData = {
                popularData: response[0].data,
                upcomingData: response[1].data,
                trendingData: response[2].data.results[randomNum]
            }
            res.render('index', {movieData})
        })
        .catch(err => console.log(err))
});

module.exports = router;