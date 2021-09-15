const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/User.model');
const { CDNupload } = require('../config/upload.config');
const { alreadyLoggedIn, isLoggedIn } = require('../middleware');


router.get('/register', alreadyLoggedIn, (req, res) => res.render('auth/register'))

router.post('/register', alreadyLoggedIn, CDNupload.single('avatar'), (req, res) => {

    const { username, email, password } = req.body

    if (password.length === 0 || username.length === 0) {
        res.render('auth/register', { errorMsg: 'Please, fill in all fields.' })
        return
    }

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const query = {
        username,
        email,
        password: hashPass,
    }

    if(req.file) query.avatar = req.file.path

    User
        .create(query)
        .then(res.redirect('/'))
        .catch(err => console.log(err))
})


router.get('/login', alreadyLoggedIn, (req, res) => res.render('auth/login'))
router.post('/login', alreadyLoggedIn, (req, res) => {

    const { username, password } = req.body

    if (username.length === 0 || password.length === 0) {
        res.render('auth/login', {errorMsg: 'Fill in all fields'});
        return;
    };

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', {errorMsg: 'User not found'})
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', {errorMsg: 'Invalid password'})
                return
            }

            if (user.role === 'Admin'){
                req.app.locals.isAdmin = true
            }

            req.session.currentUser = user

            req.app.locals.isLogged = true

            res.redirect('/')
        })
        .catch(err => console.log(err))
})

router.get('/logout', isLoggedIn, (req, res) => req.session.destroy(() => {
    res.redirect('/')
    req.app.locals.isLogged = false
    req.app.locals.isAdmin = false
}))

module.exports = router;
