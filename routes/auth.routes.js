const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/User.model');
const { CDNupload } = require('../config/upload.config');
const { alreadyLoggedIn, isLoggedIn } = require('../middleware');

const transporter = require('./../config/mailing.config')


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

    transporter
    .sendMail({
      from: `Bienvenido/a ${username} <hellomoviehunter@gmail.com>`,
      to: email,
      subject: `Welcome ${username}`,
      text: 'Hello',
      html: `<b>Hello ${username}!<br>Welcome to Movie Hunter! He really hope you enjoy your stay.<br>Sicerely, the Movie Hunter team.</b>`
    })

    if(req.file) query.avatar = req.file.path

    User
        .create(query)
        .then(theUser => {
            req.session.currentUser = theUser
        })
        .then(res.redirect('/'))
        .catch(err => console.log(err))
})


router.get('/login', alreadyLoggedIn, (req, res) => res.render('auth/login'))
router.post('/login', alreadyLoggedIn, (req, res) => {

    const { username, password } = req.body

    if (username.length === 0 || password.length === 0) {
        res.render('auth/login', {errorMsg: 'Fill in all fields'});
        return;
    }

    // if (password.length < 8) {
    //     res.render('auth/login', {errorMsg: 'Password must have at least 8 characters long'})
    //     return
    // }

    if (!password.match(/^[a-zA-Z0-9]+$/)) {
        res.render('auth/login', {errorMsg: 'Please only use letters and numbers'})
        return
    }

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

            if(user.role === 'Mod') {
                req.app.locals.isMod = true
            }

            req.session.currentUser = user
            req.app.locals.isLogged = true
            req.app.locals.siteUsername = username
            req.app.locals.userAvatar = user.avatar

            res.redirect('/')
        })
        .catch(err => console.log(err))
})

router.get('/logout', isLoggedIn, (req, res) => req.session.destroy(() => {
    req.app.locals.isLogged = false
    req.app.locals.isAdmin = false
    res.redirect('/')
}))

module.exports = router;
