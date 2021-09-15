const { default: axios } = require('axios');
const express = require('express');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

const CharactersApiHandler = require('../public/js/api-handler');
const apiHandler = new CharactersApiHandler

const User = require('./../models/User.model')
const Comment = require('./../models/Comment.model')

router.get('/search', isLoggedIn, (req, res) => res.render('movies/search'))

router.get('/:movieId', isLoggedIn, (req, res) => {

    const {movieId} = req.params

    console.log(movieId);

    const dataObject = {
        comments : {},
        movieInfo : []
    }


    Comment
        .find({ 'movieRef': movieId, 'isValidated': true })
        .populate('authorId')
        .then(response => {
            dataObject.comments = response
            return apiHandler.getDetails(movieId)
        })
        .then(response => {
            dataObject.movieInfo.push(response.data)
            console.log(dataObject);
            res.render('movies/details', dataObject)
        })
        .catch(err => console.log(err))
})

router.post('/favourite/:movieId', isLoggedIn, (req, res) => {

    const {movieId} = req.params
    const user = req.session.currentUser

    User
    .findByIdAndUpdate(user._id, { $push: {'favouriteMovies': movieId}})
    .then(() => res.redirect('/user/profile'))
    .catch(err => console.log('ERROR ADDING FAVOURITE MOVIE', err))

})


router.get('/:movieId/addcomment', (req, res) => {

    const {movieId} = req.params

    apiHandler.getDetails(movieId)
    .then(response => {
        const movieData = response.data
        console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOL', movieData)
        res.render('movies/addcomment', {movieData})})
    .catch(err => console.log(err))
})



router.post('/:movieId/addcomment', (req, res) => {

    const {content, movieRef, rating} = req.body
    const author = req.session.currentUser

    Comment
        .create({ content, movieRef, authorId: author._id, rating })
        .then(res.redirect(`/movies/${movieRef}`))
        .catch(err => console.log(err))
})

router.get('/:movieId/remove', (req, res) => {

    const { movieId } = req.params
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $pull: {favouriteMovies: movieId}}, {new: true})
        .then((newUser) => {
            req.session.currentUser = newUser
            res.redirect('/user/profile')
        })
        .catch(err => console.log(err))
})

module.exports = router;
