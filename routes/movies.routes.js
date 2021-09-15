const { default: axios } = require('axios');
const express = require('express');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

const User = require('./../models/User.model')

router.get('/search', isLoggedIn, (req, res) => res.render('movies/search'))

router.get('/:movieId', isLoggedIn, (req, res) => {

    const {movieId} = req.params
    console.log(movieId);

    axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US`)
    .then(response => res.render('movies/details', response.data))
})

router.post('/favourite/:movieId', isLoggedIn, (req, res) => {

    const movieId = req.params
    const user = req.session.currentUser

    User
    .findByIdAndUpdate(user._id, { $push: {'favouriteMovies': movieId.movieId}})
    .then(() => res.redirect('/user/profile'))
    .catch(err => console.log('ERROR ADDING FAVOURITE MOVIE', err))

})

module.exports = router;
