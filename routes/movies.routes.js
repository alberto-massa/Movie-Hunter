const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('movies/search'));





router.get('/details', (req, res) => {

    


    axios
    .get('https://api.themoviedb.org/3/search/movie?api_key=7d29ed24134deee78178561cf7b0a16c&query=Harry+Potter')
    .then(response => {
        res.render('movies/details', {response})
    })



})




module.exports = router;
