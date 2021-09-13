const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')

router.get('/search', (req, res) => res.render('user/search'))

router.post('/search/', (req, res) => {

    const { username } = req.body

    User
    .findOne({ username })
    .then(theUser => res.render('user/search', theUser))
    .catch(err => console.log(err))
})


router.get('/profile/:username', (req, res) => {

    const { username } = req.params

    User
    .findOne({ username })
    .then(theUser => res.render('user/profile', theUser))
    .catch(err => console.log(err))
})


module.exports = router;
