const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')

const { CDNupload } = require('../config/upload.config');
const { default: axios } = require('axios');

router.get('/search', (req, res) => res.render('user/search'))

router.post('/search/', (req, res) => {

    const { username } = req.body

    User
    .findOne({ username })
    .then(theUser => res.render('user/search', theUser))
    .catch(err => console.log(err))
})

router.get('/profile', (req, res) => {

    let user = req.session.currentUser

    console.log(user);
    
    const object = {
        favouriteMovies : []
    }

    if (!user) {
        res.render('auth/login', {errorMsg: 'Please, login to check your profile'})
    } 

    for (let i = 0; i < user.favouriteMovies.length; i++) {
        axios
        .get(`https://api.themoviedb.org/3/movie/${user.favouriteMovies[i]}?api_key=7d29ed24134deee78178561cf7b0a16c&language=en-US`)
        .then(response => {
            console.log(user.favouriteMovies);
            object.favouriteMovies.push(response.data)
            return User.findOne({ 'username': user.username })
        })
        .then(theUser => {
            object.user = theUser
            res.render('user/my-profile', object)
        })
        .catch(err => console.log(err))
    }
})


router.get('/profile/:username', (req, res) => {

    const { username } = req.params

    User
    .findOne({ username })
    .then(theUser => res.render('user/profile', theUser))
    .catch(err => console.log(err))
})

router.post('/edit', CDNupload.single('avatar'), (req, res) => {

    let user = req.session.currentUser

    User
    .findByIdAndUpdate(user._id, { avatar: req.file.path })
    .then(() => res.redirect('/user/profile'))
    .catch(err => console.log(err))

})


module.exports = router;
