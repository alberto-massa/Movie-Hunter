const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')
const { CDNupload } = require('../config/upload.config');

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
    console.log(user)

    if (!user) {
        res.render('auth/login', {errorMsg: 'Please, login to check your profile'})
    } 
    User
    .findOne({ 'username': user.username })
    .then(theUser => {
            res.render('user/my-profile', theUser)
        
    })
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
