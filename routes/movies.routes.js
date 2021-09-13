const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('movies/search'))
router.post('/', (req, res) => {

    console.log(req.body);
   
    const { movie } = req.body
    axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${movie}`)
    .then(response => {
        res.render('movies/search', {response})
    })
})

module.exports = router;
