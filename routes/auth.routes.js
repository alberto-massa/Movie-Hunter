const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/User.model')


router.get('/login', (req, res) => res.render('auth/login'));


router.get('/register', (req, res) => res.render('auth/register'))
router.post('/register', (req, res) => {

    const { username, email, password, avatar } = req.body

    if (password.length === 0 || username.length === 0) {
        res.render('auth/register', { errorMsg: 'Please, fill in all fields.' })
        return
    }
    

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt) 

    User
    .create({ username, email, password: hashPass, avatar })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/login', (req, res) => res.render('auth/login'))
router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username.length === 0 || password.length === 0) {
        res.render('auth/login', {errorMsg: 'Fill in all fields'})
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
        req.session.currentUser = user
        res.redirect('/')
    })
    .catch(err => console.log(err))
})



module.exports = router;
